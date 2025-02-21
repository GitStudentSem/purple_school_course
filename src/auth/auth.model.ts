import { Prop, Schema } from "@nestjs/mongoose";

Schema({ timestamps: true, _id: true });
export class AuthModel {
	@Prop({ unique: true })
	email: string;

	@Prop()
	passwordHash: string;
}
