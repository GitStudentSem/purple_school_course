import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { TopPage } from "./top-page.model";
import { FindTopPageDto } from "./dto/find-top-page.dto";
import { CreateTopPageDto } from "./dto/create-top-page.dto";
import { TopPageService } from "./top-page.service";
import { IdValidationPipe } from "@src/pipes/id-validation.pipe";
import { JwtAuthGuard } from "@src/auth/guards/jwt.guard";

@Controller("top-page")
export class TopPageController {
	constructor(private readonly topPageServie: TopPageService) {}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Post("create")
	async create(@Body() dto: CreateTopPageDto) {
		return this.topPageServie.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Get(":id")
	async get(@Param("id", IdValidationPipe) id: string) {
		return this.topPageServie.findById(id);
	}

	@Get("byAlias/:alias")
	async getByAlias(@Param("alias") alias: string) {
		return this.topPageServie.findByAlias(alias);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(":id")
	async delete(@Param("id", IdValidationPipe) id: string) {
		return this.topPageServie.deleteById(id);
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Patch(":id")
	async patch(
		@Param("id", IdValidationPipe) id: string,
		@Body() dto: CreateTopPageDto,
	) {
		return this.topPageServie.updateById(id, dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post("find")
	async find(@Body() dto: FindTopPageDto) {
		return this.topPageServie.findByCategory(dto.firstCategory);
	}
}
