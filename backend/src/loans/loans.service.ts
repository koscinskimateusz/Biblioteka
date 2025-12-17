/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Loan } from '../entities/loan.entity';

@Injectable()
export class LoansService {
    constructor(@InjectRepository(Loan) private repo: Repository<Loan>) { }

    create(bookId: string, readerId: string) {
        // TypeORM jest sprytny: wystarczy podaæ ID w obiekcie relacji
        const loan = this.repo.create({
            book: { id: bookId },
            reader: { id: readerId }
        });
        return this.repo.save(loan);
    }

    findAll() {
        // Pobieramy tylko aktywne wypo¿yczenia (gdzie returnedAt jest null)
        return this.repo.find({
            where: { returnedAt: IsNull() },
            relations: ['book', 'reader'], // Pobierz te¿ dane ksi¹¿ki i czytelnika
        });
    }

    async returnBook(id: string) {
        await this.repo.update(id, { returnedAt: new Date() });
        return { success: true };
    }
}