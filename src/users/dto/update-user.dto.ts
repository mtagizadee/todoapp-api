import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class UpdateUserDto {
  @IsEmail({},{message: 'email is not valid'})
  @IsOptional()
  readonly email?: string;

  @IsString({message: 'password must be a string'})
  @Length(4,16,{message: "password's length must be between 4 and 16 characters"})
  @IsOptional()
  readonly password?: string;

  @IsString({message: 'firstName must be a string'})
  @IsOptional()
  readonly firstName?: string;

  @IsString({message: 'secondName must be a string'})
  @IsOptional()
  readonly secondName?: string;
}