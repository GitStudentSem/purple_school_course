import { Module } from "@nestjs/common";
import { ReviewController } from "./review.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Review, ReviewSchema } from "./review.model";
import { ReviewService } from "./review.service";

@Module({
	controllers: [ReviewController],
	imports: [
		MongooseModule.forFeature([
			{
				name: Review.name, // Имя коллекции в MongoDB (будет использовано для модели)
				schema: ReviewSchema, // Схема, определенная через @nestjs/mongoose
			},
		]),
	],
	providers: [ReviewService],
})
export class ReviewModule {}
