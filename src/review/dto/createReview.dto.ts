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

const testObj: CreateReviewDto = {
	name: "Test 1",
	title: "Title",
	description: "Description of review",
	rating: 4,
	productId: "67d1b25af26c03342b4ef3bb",
};
