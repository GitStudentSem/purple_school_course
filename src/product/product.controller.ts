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
import { Product } from "./product.model";
import { FindProductDto } from "./dto/find-product.dto";
import { CreateProductDto } from "./dto/createProduct.dto";
import { ProductService } from "./product.service";
import { IdValidationPipe } from "@src/pipes/id-validation.pipe";
import { JwtAuthGuard } from "@src/auth/guards/jwt.guard";

@Controller("product")
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@UseGuards(JwtAuthGuard)
	@Post("create")
	async create(@Body() dto: CreateProductDto) {
		return this.productService.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Get(":id")
	async get(@Param("id", IdValidationPipe) id: string) {
		return this.productService.findById(id);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(":id")
	async delete(@Param("id", IdValidationPipe) id: string) {
		return this.productService.deleteById(id);
	}

	@UseGuards(JwtAuthGuard)
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
