import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator";

export class SignupDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly username: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    readonly email: string;
    @ApiProperty()
    @IsNotEmpty()
    readonly password: string
}