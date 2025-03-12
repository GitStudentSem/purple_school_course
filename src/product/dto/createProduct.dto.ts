import { Type } from "class-transformer";
import {
	IsArray,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from "class-validator";

class ProductCharacteristicDto {
	@IsString()
	name: string;

	@IsString()
	value: string;
}

export class CreateProductDto {
	@IsString()
	image: string;

	@IsString()
	title: string;

	@IsNumber()
	price: number;

	@IsNumber()
	oldPrice?: number;

	@IsOptional()
	@IsNumber()
	credit?: number;

	@IsString()
	description: string;

	@IsString()
	advantages: string;

	@IsString()
	disAdvantages: string;

	@IsArray()
	@IsString({ each: true })
	categories: string[];

	@IsArray()
	@IsString({ each: true })
	tags: string[];

	@IsArray()
	@ValidateNested()
	@Type(() => ProductCharacteristicDto)
	characteristics: ProductCharacteristicDto[];
}

const testObj: CreateProductDto = {
	image: "1.png",
	title: "My product",
	price: 100,
	oldPrice: 120,
	credit: 10,
	description: "Description of product",
	advantages: "Adventures of product",
	disAdvantages: "Disdventures of product",
	categories: ["test"],
	tags: ["tag1"],
	characteristics: [
		{ name: "Characteristic 1", value: "1" },
		{ name: "Characteristic 2", value: "2" },
	],
};
