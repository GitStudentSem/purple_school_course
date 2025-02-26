import { Injectable } from "@nestjs/common";
import { Review, ReviewDocument } from "./review.model";
import { InjectModel } from "@nestjs/mongoose";
import { DeleteResult, Model, Types } from "mongoose";
import { CreateReviewDto } from "./dto/createReview.dto";

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
	) {}

	async create(dto: CreateReviewDto): Promise<ReviewDocument> {
		return this.reviewModel.create(dto);
	}

	async delete(id: string): Promise<ReviewDocument | null> {
		return this.reviewModel.findByIdAndDelete(id).exec();
	}

	// Этот тест валится
	async findByProductId(productId: string): Promise<ReviewDocument[]> {
		return this.reviewModel
			.find({ productId: new Types.ObjectId(productId) })
			.exec();
	}

	async deleteByProductId(productId: string): Promise<DeleteResult> {
		return this.reviewModel
			.deleteMany({
				productId: new Types.ObjectId(productId),
			})
			.exec();
	}
}
