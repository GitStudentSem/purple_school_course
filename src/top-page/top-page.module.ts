import { Module } from "@nestjs/common";
import { TopPageController } from "./top-page.controller";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { TopPageModel } from "./top-page.model";

@Module({
	controllers: [TopPageController],
	imports: [
		ConfigModule,
		MongooseModule.forFeature([
			{
				name: "TopPage", // Имя коллекции в MongoDB (будет использовано для модели)
				schema: TopPageModel, // Схема, определенная через @nestjs/mongoose
			},
		]),
	],
})
export class TopPageModule {}
