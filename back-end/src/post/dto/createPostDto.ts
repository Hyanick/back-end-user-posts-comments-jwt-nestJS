import { IsNotEmpty } from "class-validator";

export class  CreatePostDto {
    @IsNotEmpty()
    readonly title;
    @IsNotEmpty()
    readonly body: string
}