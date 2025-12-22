/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsInt, Min, IsISBN, IsOptional } from 'class-validator';

export class CreateBookDto {
    @IsString({ message: 'Tytu³ musi byæ ci¹giem znaków' })
    @IsNotEmpty({ message: 'Tytu³ nie mo¿e byæ pusty' })
    title: string;

    @IsString({ message: 'Autor musi byæ ci¹giem znaków' })
    @IsNotEmpty({ message: 'Autor nie mo¿e byæ pusty' })
    author: string;

    @IsString()
    @IsNotEmpty({ message: 'ISBN jest wymagany' })
 
    isbn: string;

    @IsInt({ message: 'Liczba egzemplarzy musi byæ liczb¹ ca³kowit¹' })
    @Min(0, { message: 'Liczba egzemplarzy nie mo¿e byæ ujemna' })
    @IsOptional() 
    availableCount?: number;
}