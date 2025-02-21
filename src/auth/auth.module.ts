import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModel } from "./auth.model";

@Module({
	controllers: [AuthController],
	imports: [
		MongooseModule.forFeature([
			{
				name: "Auth", // Имя коллекции в MongoDB (будет использовано для модели)
				schema: AuthModel, // Схема, определенная через @nestjs/mongoose
			},
		]),
	],
})
export class AuthModule {}
