/* eslint-disable prettier/prettier */
import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateLoanDto {
    @IsUUID('4', { message: 'Nieprawid³owe ID ksi¹¿ki' })
    @IsNotEmpty()
    bookId: string;

    @IsUUID('4', { message: 'Nieprawid³owe ID czytelnika' })
    @IsNotEmpty()
    readerId: string;
}