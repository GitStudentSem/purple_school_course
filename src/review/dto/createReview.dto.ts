import { IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
	@IsString()
	name: string;

	@IsString()
	title: string;

	@IsString()
	description: string;

	@Max(5)
	@Min(1, { message: "Рейтинг не может быть менее 1" })
	@IsNumber()
	rating: number;

	@IsString()
	productId: string;
}

const test = {
	name: "Semyon",
	title: "Title",
	description: "Description",
	rating: 3,
	productId: "67c3466e84b21782a8255254",
};
