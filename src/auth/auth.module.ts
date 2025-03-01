import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, User } from "./user.model";
import { AuthService } from './auth.service';

@Module({
	controllers: [AuthController],
	imports: [
		MongooseModule.forFeature([
			{
				name: User.name, // Имя коллекции в MongoDB (будет использовано для модели)
				schema: UserSchema, // Схема, определенная через @nestjs/mongoose
			},
		]),
	],
	providers: [AuthService],
})
export class AuthModule {}
