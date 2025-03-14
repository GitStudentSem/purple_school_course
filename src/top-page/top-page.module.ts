import { Module } from "@nestjs/common";
import { TopPageController } from "./top-page.controller";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { TopPageSchema } from "./top-page.model";
import { TopPageService } from './top-page.service';

@Module({
	controllers: [TopPageController],
	imports: [
		ConfigModule,
		MongooseModule.forFeature([
			{
				name: "TopPage", // Имя коллекции в MongoDB (будет использовано для модели)
				schema: TopPageSchema, // Схема, определенная через @nestjs/mongoose
			},
		]),
	],
	providers: [TopPageService],
})
export class TopPageModule {}
