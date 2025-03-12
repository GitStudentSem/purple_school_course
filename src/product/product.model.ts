import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

class ProductCharacteristic {
	@Prop()
	name: string;

	@Prop()
	value: string;
}
export type ProductDocument = HydratedDocument<Product>;

@Schema({ _id: true })
export class Product {
	@Prop()
	image: string;

	@Prop()
	title: string;

	@Prop()
	price: number;

	@Prop()
	oldPrice?: number;

	@Prop()
	credit?: number;

	@Prop()
	description: string;

	@Prop()
	advantages: string;

	@Prop()
	disAdvantages: string;

	@Prop({ type: [String], default: [] })
	categories: string[];

	@Prop({ type: [String], default: [] })
	tags: string[];

	@Prop({ type: [ProductCharacteristic], default: [], _id: false })
	characteristics: ProductCharacteristic[];
}
export const ProductSchema = SchemaFactory.createForClass(Product);
