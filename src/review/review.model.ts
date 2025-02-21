import { Prop, Schema } from "@nestjs/mongoose";

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
	createdAt: Date;
}
