import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { App } from "supertest/types";
import { AppModule } from "../src/app.module";
import { disconnect } from "mongoose";
import { AuthDto } from "../src/auth/dto/auth.dto";
import {
	USER_NOT_FOUND_ERROR,
	WRONG_PASSWORD_ERROR,
} from "../src/auth/auth.constants";

const loginDto: AuthDto = { login: "a@a.ru", password: "1" };

describe("AuthController (e2e)", () => {
	let app: INestApplication<App>;
	let createdId: string;
	let token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it("/auth/login (POST) -success", async () => {
		return request(app.getHttpServer())
			.post("/auth/login")
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.access_token).toBeDefined();
				return;
			});
	});

	it("/auth/login (POST) -failed password", () => {
		return request(app.getHttpServer())
			.post("/auth/login")
			.send({ ...loginDto, password: "2" })
			.expect(401, {
				message: WRONG_PASSWORD_ERROR,
				error: "Unauthorized",
				statusCode: 401,
			});
	});

	it("/auth/login (POST) -failed login", () => {
		return request(app.getHttpServer())
			.post("/auth/login")
			.send({ ...loginDto, login: "aaa@a.ru" })
			.expect(401, {
				message: USER_NOT_FOUND_ERROR,
				error: "Unauthorized",
				statusCode: 401,
			});
	});

	afterAll(() => {
		disconnect();
	});
});
