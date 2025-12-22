/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateReaderDto {
    @IsString({ message: 'Imiê musi byæ ci¹giem znaków' })
    @IsNotEmpty({ message: 'Imiê jest wymagane' })
    firstName: string;

    @IsString({ message: 'Nazwisko musi byæ ci¹giem znaków' })
    @IsNotEmpty({ message: 'Nazwisko jest wymagane' })
    lastName: string;

    @IsEmail({}, { message: 'Podaj poprawny adres email' })
    @IsNotEmpty({ message: 'Email jest wymagany' })
    email: string;
}