import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTodoDto {
  @IsString({message: 'title must be a string'})
  @IsNotEmpty({message: 'title is missing'})
  readonly title: string;

  @IsString({message: 'description must be a string'})
  @IsOptional()
  readonly description?: string;
}