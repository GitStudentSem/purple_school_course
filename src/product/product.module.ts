import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "./product.model";

@Module({
	controllers: [ProductController],
	imports: [
		MongooseModule.forFeature([
			{
				name: "Product", // Имя коллекции в MongoDB (будет использовано для модели)
				schema: ProductSchema, // Схема, определенная через @nestjs/mongoose
			},
		]),
	],
})
export class ProductModule {}
