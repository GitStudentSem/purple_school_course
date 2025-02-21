import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

class ProductCharacteristic {
	@Prop()
	name: string;

	@Prop()
	value: string;
}

Schema({ _id: true });
export class ProductModel {
	@Prop()
	image: string;

	@Prop()
	title: string;

	@Prop()
	price: number;

	@Prop()
	oldPrice?: number; // Дополнительное поле, может быть необязательным

	@Prop()
	credit?: number; // Дополнительное поле, может быть необязательным

	@Prop()
	calculatedRating?: number; // Дополнительное поле, может быть необязательным

	@Prop()
	description: string; // Исправил опечатку (было "descrption")

	@Prop()
	advantages: string;

	@Prop()
	disAdvantages: string;

	@Prop({ type: [String], default: [] }) // Массив строк
	categories: string[];

	@Prop({ type: [String], default: [] }) // Массив строк
	tags: string[];

	@Prop({ type: [ProductCharacteristic], default: [], _id: false }) // Объект с произвольными ключами и значениями
	characteristics: ProductCharacteristic[];
}
export const ProductSchema = SchemaFactory.createForClass(ProductModel);
