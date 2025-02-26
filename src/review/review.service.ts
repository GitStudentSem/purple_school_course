import { Injectable } from "@nestjs/common";
import { ReviewModel, ReviewDocument } from "./review.model";
import { InjectModel } from "@nestjs/mongoose";
import { DeleteResult, Model, Types } from "mongoose";
import { CreateReviewDto } from "./dto/createReview.dto";

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(ReviewModel.name) private reviewModel: Model<ReviewDocument>,
	) {}

	async create(dto: CreateReviewDto): Promise<ReviewDocument> {
		console.log("in service dto", dto);
		const res = await this.reviewModel.create(dto);
		console.log("res", res);
		return res;
	}

	async delete(id: string): Promise<ReviewDocument | null> {
		return this.reviewModel.findByIdAndDelete(id).exec();
	}

	// Этот тест валится
	async findByProductId(productId: string): Promise<ReviewDocument[]> {
		return this.reviewModel
			.find({ product: new Types.ObjectId(productId) })
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
