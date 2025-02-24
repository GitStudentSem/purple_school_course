import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MSchema } from "mongoose";

export type ReviewDocument = HydratedDocument<ReviewModel>;

Schema({ _id: true, timestamps: true });
export class ReviewModel {
	@Prop()
	name: string;

	@Prop()
	title: string;

	@Prop()
	description: string;

	@Prop()
	rating: number;

	@Prop()
	productId: MSchema.Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
