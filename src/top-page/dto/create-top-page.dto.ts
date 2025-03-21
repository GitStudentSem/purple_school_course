import { TopLevelCategory } from "../top-page.model";
import {
	IsArray,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export class HhDataDto {
	@IsNumber()
	count: number;

	@IsNumber()
	juniorSalary: number;

	@IsNumber()
	middleSalary: number;

	@IsNumber()
	seniorSalary: number;
}

export class TopPageAdvantageDto {
	@IsString()
	title: string;

	@IsString()
	description: string;
}

export class CreateTopPageDto {
	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;

	@IsString()
	secondCategory: string;

	@IsString()
	alias: string;

	@IsString()
	title: string;

	@IsString()
	category: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => HhDataDto)
	hh?: HhDataDto;

	@IsArray()
	@ValidateNested()
	@Type(() => TopPageAdvantageDto)
	advantages: TopPageAdvantageDto[];

	@IsString()
	seoText: string;

	@IsString()
	tagsTitle: string;

	@IsArray()
	@IsString({ each: true })
	tags: string[];
}

const createTopPageTest: CreateTopPageDto = {
	firstCategory: 1,
	secondCategory: "Development",
	alias: "typescript",
	title: "Courses for TypeScript",
	category: "typescript",
	hh: {
		count: 1000,
		juniorSalary: 120000,
		middleSalary: 220000,
		seniorSalary: 350000,
	},
	advantages: [{ title: "Development speed", description: "My description" }],
	seoText: "test",
	tagsTitle: "received knoledges",
	tags: ["TypeScript"],
};
