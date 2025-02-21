import { Module } from "@nestjs/common";
import { ReviewController } from "./review.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ReviewModel } from "./review.model";

@Module({
	controllers: [ReviewController],
	imports: [
		MongooseModule.forFeature([
			{
				name: "Review", // Имя коллекции в MongoDB (будет использовано для модели)
				schema: ReviewModel, // Схема, определенная через @nestjs/mongoose
			},
		]),
	],
})
export class ReviewModule {}
