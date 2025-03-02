import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MSchema } from "mongoose";
import { ProductModel } from "@src/product/product.model";

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ _id: true, timestamps: true })
export class Review {
	@Prop()
	name: string;

	@Prop()
	title: string;

	@Prop()
	description: string;

	@Prop()
	rating: number;

	@Prop({ type: MSchema.Types.ObjectId, ref: () => ProductModel })
	productId: MSchema.Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
