// backend/users/users.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserSchema } from './schemas/users.schema'; // Rename to avoid conflict
import { User } from './models/user.model'; // GraphQL User type
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login.input';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserSchema.name) private userModel: Model<UserSchema>) {}

  async create(input: CreateUserInput): Promise<User> {
    const { email, password, name } = input;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ email, password: hashedPassword, name });
    const savedUser = await user.save();
    return {
      _id: (savedUser._id as any).toString(),
      email: savedUser.email,
      name: savedUser.name,
    };
  }

  async login(input: LoginInput): Promise<string> {
    const { email, password } = input;
    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return jwt.sign({ userId: (user._id as any).toString() }, 'your-secret-key', { expiresIn: '1h' });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return {
      _id: (user._id as any).toString(),
      email: user.email,
      name: user.name,
    };
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users.map(user => ({
      _id: (user._id as any).toString(),
      email: user.email,
      name: user.name,
    }));
  }
}