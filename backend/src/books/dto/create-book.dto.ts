/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsInt, Min, IsOptional, Matches } from 'class-validator';

export class CreateBookDto {
    @IsString({ message: 'Tytu³ musi byæ ci¹giem znaków' })
    @IsNotEmpty({ message: 'Tytu³ nie mo¿e byæ pusty' })
    title: string;

    @IsString({ message: 'Autor musi byæ ci¹giem znaków' })
    @IsNotEmpty({ message: 'Autor nie mo¿e byæ pusty' })
    author: string;

    @IsString({ message: 'ISBN musi byæ ci¹giem znaków' })
        //@IsISBN(13, { message: 'Format ISBN to 000-00-00-00000-0' })
    @Matches(/^[0-9- ]{10,20}$/, { message: 'Format ISBN to 000-00-0000-000-0'})
    @IsNotEmpty({ message: 'ISBN jest wymagany' })
    isbn: string;

    @IsInt({ message: 'Liczba egzemplarzy musi byæ liczb¹ ca³kowit¹' })
    @Min(0, { message: 'Liczba egzemplarzy nie mo¿e byæ ujemna' })
    @IsOptional() 
    availableCount?: number;
}