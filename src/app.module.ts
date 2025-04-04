import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { TopPageModule } from "./top-page/top-page.module";
import { ProductModule } from "./product/product.module";
import { ReviewModule } from "./review/review.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users/users.module";
import { getMongoConfig } from "./configs/mongo.config";
import { FilesModule } from './files/files.module';

@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
		// Глобальное подключение модуля не нужно получается?
		// MongooseModule.forRoot("mongodb://localhost/test"),
		ConfigModule.forRoot(),
		AuthModule,
		TopPageModule,
		ProductModule,
		ReviewModule,
		UsersModule,
		FilesModule,
	],
})
export class AppModule {}
