// backend/users/users.resolver.ts
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './models/user.model'; // Use the GraphQL model
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login.input';
// import { AuthMiddleware } from '../middlewares/auth.middleware';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async signup(@Args('input') input: CreateUserInput) {
    return this.usersService.create(input);
  }

  @Mutation(() => String)
  async login(@Args('input') input: LoginInput) {
    return this.usersService.login(input);
  }

  @Query(() => User)
//   @UseMiddleware(AuthMiddleware)
  async getUserInfo(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Query(() => [User])
  async getAllUsers() {
    return this.usersService.findAll();
  }
}