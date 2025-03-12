import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { Product } from "./product.model";
import { FindProductDto } from "./dto/find-product.dto";
import { CreateProductDto } from "./dto/createProduct.dto";
import { ProductService } from "./product.service";
import { IdValidationPipe } from "@src/pipes/id-validation.pipe";

@Controller("product")
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post("create")
	async create(@Body() dto: CreateProductDto) {
		return this.productService.create(dto);
	}

	@Get(":id")
	async get(@Param("id", IdValidationPipe) id: string) {
		return this.productService.findById(id);
	}

	@Delete(":id")
	async delete(@Param("id", IdValidationPipe) id: string) {
		return this.productService.deleteById(id);
	}

	@Patch(":id")
	async patch(@Param("id", IdValidationPipe) id: string, @Body() dto: Product) {
		return this.productService.updateById(id, dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post("find")
	async find(@Body() dto: FindProductDto) {
		return this.productService.findWithReviews(dto);
	}
}
