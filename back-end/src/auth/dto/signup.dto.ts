import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

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
  readonly password: string;
  @IsNotEmpty()
  readonly passwordConfirm: string;
  @IsNotEmpty()
  readonly firstName: string;
  @IsNotEmpty()
  readonly lastName: string;
  @IsNotEmpty()
  readonly birthDay: string;
  @IsNotEmpty()
  readonly birthCountry: string;
  @IsNotEmpty()
  readonly gender: string;
  @IsNotEmpty()
  readonly adress: string;
  readonly adressComplement: string;
  @IsNotEmpty()
  readonly city: string;
  @IsNotEmpty()
  readonly zipCode: string;
  readonly phone: string;
  readonly lastDateConnexion?: Date;
}
