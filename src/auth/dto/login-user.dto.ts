import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginUserDto {
  @IsEmail({},{message: 'email is not valid'})
  @IsNotEmpty({message: 'email is missing'})
  readonly email: string;

  @IsString({message: 'password must be a string'})
  @Length(4,16,{message: "password's length must be between 4 and 16 characters"})
  @IsNotEmpty({message: 'password is missing'})
  readonly password: string;
}