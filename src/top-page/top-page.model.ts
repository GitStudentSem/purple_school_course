import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum TopLevelCategory {
	Courses = 0,
	Services = 1,
	Books = 2,
	Products = 3,
}

export class HhData {
	@Prop()
	count: number;

	@Prop()
	juniorSalary: number;

	@Prop()
	middleSalary: number;

	@Prop()
	seniorSalary: number;
}

export class TopPageAdvantage {
	@Prop()
	title: string;

	@Prop()
	description: string;
}

@Schema({ _id: true, timestamps: true })
export class TopPage {
	@Prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory;

	@Prop()
	secondCategory: string;

	@Prop({ unique: true })
	alias: string;

	@Prop()
	title: string;

	@Prop()
	category: string;

	@Prop({ type: HhData })
	hh?: HhData;

	@Prop({ type: [TopPageAdvantage] })
	advantages: TopPageAdvantage[];

	@Prop()
	seoText: string;

	@Prop()
	tagsTitle: string;

	@Prop({ type: [String] })
	tags: string[];
}
export const TopPageSchema = SchemaFactory.createForClass(TopPage);

TopPageSchema.index({ "$**": "text" });
// текстовый поиск конкретных полей
// TopPageSchema.index({ title: "text", seoText: "text"});
