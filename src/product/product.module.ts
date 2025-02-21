import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModel } from "src/auth/auth.model";
import { ProductModel } from "./product.model";

@Module({
	controllers: [ProductController],
	imports: [
		MongooseModule.forFeature([
			{
				name: "Product", // Имя коллекции в MongoDB (будет использовано для модели)
				schema: ProductModel, // Схема, определенная через @nestjs/mongoose
			},
		]),
	],
})
export class ProductModule {}
