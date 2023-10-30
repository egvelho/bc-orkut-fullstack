import { IsString, IsEmail } from "class-validator";

export class CreateUserDto {
  @IsString({
    message: "O nome precisa ser uma string",
  })
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  avatar: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
