import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true, _id: true })
export class User {
	@Prop({ unique: true })
	email: string;

	@Prop()
	passwordHash: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
