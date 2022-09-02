import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsEmail({},{message: 'email is not valid'})
  @IsNotEmpty({message: 'email is missing'})
  readonly email: string;

  @IsString({message: 'password must be a string'})
  @Length(4,16,{message: "password's length must be between 4 and 16 characters"})
  @IsNotEmpty({message: 'password is missing'})
  readonly password: string;

  @IsString({message: 'firstName must be a string'})
  @IsNotEmpty({message: 'firstName is missing'})
  readonly firstName: string;

  @IsString({message: 'secondName must be a string'})
  @IsNotEmpty({message: 'secondName is missing'})
  readonly secondName: string;
}