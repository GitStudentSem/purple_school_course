import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { App } from "supertest/types";
import { AppModule } from "../src/app.module";
import { CreateReviewDto } from "../src/review/dto/createReview.dto";
import { disconnect, Types } from "mongoose";
import { REVIEW_NOT_FOUND } from "../src/review/review.constants";

const productId = new Types.ObjectId().toHexString();
const testDto: CreateReviewDto = {
	name: "Test",
	title: "Title",
	description: "description text",
	rating: 5,
	productId,
};

describe("AppController (e2e)", () => {
	let app: INestApplication<App>;
	let createdId: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it("/review/create (POST) -success", async () => {
		return request(app.getHttpServer())
			.post("/review/create")
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				console.log("body", body);
				createdId = body._id;
				expect(createdId).toBeDefined();
				return;
			});
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
			.expect(200);
	});

	it("/review/:id (DELETE) -failed", () => {
		return request(app.getHttpServer())
			.delete(`/review/${new Types.ObjectId().toHexString()}`)
			.expect(404, { statusCode: 404, message: REVIEW_NOT_FOUND });
	});

	afterAll(() => {
		disconnect();
	});
});
