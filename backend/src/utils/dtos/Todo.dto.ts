import { IsNotEmpty } from "class-validator";

export class TodoDto {
    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    completed: boolean
}