import { Injectable, NotFoundException } from "@nestjs/common";
import { Product, ProductDocument } from "./product.model";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateProductDto } from "./dto/createProduct.dto";
import { PRODUCT_NOT_FOUND_ERROR } from "./product.constants";
import { FindProductDto } from "./dto/find-product.dto";
import { Review } from "@src/review/review.model";

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(Product.name) private productModel: Model<ProductDocument>,
	) {}

	async create(dto: CreateProductDto) {
		return this.productModel.create(dto);
	}

	async findById(id: string) {
		const product = await this.productModel.findById(id).exec();
		console.log("product", product);
		if (!product) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		}
		return product;
	}

	async deleteById(id: string) {
		const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();

		if (!deletedProduct) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		}
		return deletedProduct;
	}

	async updateById(id: string, dto: CreateProductDto) {
		const updatedProduct = await this.productModel
			.findByIdAndUpdate(id, dto, { new: true })
			.exec();

		if (!updatedProduct) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		}
		return updatedProduct;
	}

	async findWithReviews(dto: FindProductDto) {
		return this.productModel
			.aggregate([
				{
					$match: { categories: dto.category },
				},
				{ $sort: { _id: 1 } },
				{ $limit: dto.limit },
				{
					$lookup: {
						from: "reviews",
						localField: "_id",
						foreignField: "productId",
						as: "reviews",
					},
				},
				{
					$addFields: {
						reviewCount: { $size: "$reviews" },
						reviewAvg: { $avg: "$reviews.rating" },
						reviews: {
							$function: {
								body: `function (reviews) {
									reviews.sort((a, b) => {
										return new Date(b.createdAt) - new Date(a.createdAt);
									});
									return reviews;
								}`,
								args: ["$reviews"],
								lang: "js",
							},
						},
					},
				},
			])
			.exec() as Promise<
			(Product & {
				review: Review[];
				reviewCount: number;
				reviewAvg: number;
			})[]
		>;
	}
}
