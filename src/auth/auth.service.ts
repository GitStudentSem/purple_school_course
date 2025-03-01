import { Injectable } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.model";
import { Model } from "mongoose";
import { UserDocument } from "src/users/models/user.model";
import { getSalt, hashSync } from "bcryptjs";
import { hash } from "bcryptjs";

@Injectable()
export class AuthService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async createUser(dto: AuthDto) {
		const passwordHash = await hash(dto.password, 10);

		const newUser = new this.userModel({
			email: dto.login,
			passwordHash,
		});

		return newUser.save();
	}

	async findUser(email: string) {
		return this.userModel.findOne({ email }).exec();
	}
}
