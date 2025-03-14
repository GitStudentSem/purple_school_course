import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TopLevelCategory, TopPage } from "./top-page.model";
import { CreateTopPageDto } from "./dto/create-top-page.dto";
import { NOT_FOUND_TOP_PAGE_ERROR } from "./top-page.constants";
import { FindTopPageDto } from "./dto/find-top-page.dto";

@Injectable()
export class TopPageService {
	constructor(
		@InjectModel(TopPage.name) private topPageModel: Model<TopPage>,
	) {}

	async create(dto: CreateTopPageDto) {
		return this.topPageModel.create(dto);
	}

	async findById(id: string) {
		const foundedTopPage = await this.topPageModel.findById(id).exec();

		if (!foundedTopPage) {
			throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
		}

		return foundedTopPage;
	}

	async findByAlias(alias: string) {
		const foundedTopPage = await this.topPageModel.findOne({ alias }).exec();

		if (!foundedTopPage) {
			throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
		}

		return foundedTopPage;
	}

	async deleteById(id: string) {
		const deletedTopPage = await this.topPageModel.findByIdAndDelete(id).exec();

		if (!deletedTopPage) {
			throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
		}
	}

	async updateById(id: string, dto: CreateTopPageDto) {
		const updatedTopPage = await this.topPageModel
			.findByIdAndUpdate(id, dto, {
				new: true,
			})
			.exec();

		if (!updatedTopPage) {
			throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
		}

		return updatedTopPage;
	}

	async findByCategory(firstCategory: TopLevelCategory) {
		return await this.topPageModel
			.find({ firstCategory }, { alias: 1, secondCategory: 1, title: 1 })
			.exec();
	}
}
