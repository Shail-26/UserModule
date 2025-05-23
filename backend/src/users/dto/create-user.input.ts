import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
    @Field()
    name: string;

    @Field()
    password: string;

    @Field()
    email: string;
}