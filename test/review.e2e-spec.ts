import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { App } from "supertest/types";
import { AppModule } from "../src/app.module";
import { CreateReviewDto } from "../src/review/dto/createReview.dto";
import { disconnect, Types } from "mongoose";
import { REVIEW_NOT_FOUND } from "../src/review/review.constants";
import { AuthDto } from "@src/auth/dto/auth.dto";

const productId = new Types.ObjectId().toHexString();
const testDto: CreateReviewDto = {
	name: "Test",
	title: "Title",
	description: "description text",
	rating: 5,
	productId,
};

const loginDto: AuthDto = { login: "a@a.ru", password: "1" };

describe("AppController (e2e)", () => {
	let app: INestApplication<App>;
	let createdId: string;
	let token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		const { body } = await request(app.getHttpServer())
			.post("/auth/login")
			.send(loginDto);
		token = body.access_token;
	});

	it("/review/create (POST) -success", async () => {
		return request(app.getHttpServer())
			.post("/review/create")
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
				return;
			});
	});

	it("/review/create (POST) -failed", () => {
		return request(app.getHttpServer())
			.post("/review/create")
			.send({ ...testDto, rating: 0 })
			.expect(400);
	});

	it("/review/byProduct/:productId (GET) -success", async () => {
		return request(app.getHttpServer())
			.get(`/review/byProduct/${productId}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(1);
				return;
			});
	});

	it("/review/byProduct/:productId (GET) -failed", async () => {
		return request(app.getHttpServer())
			.get(`/review/byProduct/${new Types.ObjectId().toHexString()}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(0);
				return;
			});
	});

	it("/review/:id (DELETE) -success", () => {
		return request(app.getHttpServer())
			.delete(`/review/${createdId}`)
			.set("Authorization", `Bearer ${token}`)
			.expect(200);
	});

	it("/review/:id (DELETE) -failed", () => {
		return request(app.getHttpServer())
			.delete(`/review/${new Types.ObjectId().toHexString()}`)
			.set("Authorization", `Bearer ${token}`)
			.expect(404, { statusCode: 404, message: REVIEW_NOT_FOUND });
	});

	afterAll(() => {
		disconnect();
	});
});
