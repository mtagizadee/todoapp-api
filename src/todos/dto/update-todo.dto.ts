import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateTodoDto {
  @IsString({message: 'title must be a string'})
  @IsOptional()
  readonly title?: string;

  @IsString({message: 'description must be a string'})
  @IsOptional()
  readonly description?: string;

  @IsBoolean({message: 'completed must be a boolean'})
  @IsOptional()
  readonly completed: boolean;
}