/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { DataSource, IsNull } from 'typeorm'; 
import { Loan } from '../entities/loan.entity';
import { Book } from '../entities/book.entity';
import { Reader } from '../entities/reader.entity';
import { CreateLoanDto } from './dto/create-loan.dto';

@Injectable()
export class LoansService {
    constructor(private dataSource: DataSource) { }

    async create(createLoanDto: CreateLoanDto) {
        const { bookId, readerId } = createLoanDto;

        
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            
            const book = await queryRunner.manager.findOne(Book, {
                where: { id: bookId }
                
            });

            if (!book) {
                throw new NotFoundException('Nie znaleziono takiej ksi¹¿ki.');
            }

            if (book.availableCount <= 0) {
                throw new BadRequestException('Brak dostêpnych egzemplarzy tej ksi¹¿ki!');
            }

            
            const reader = await queryRunner.manager.findOne(Reader, { where: { id: readerId } });
            if (!reader) {
                throw new NotFoundException('Nie znaleziono czytelnika.');
            }

            
            const loan = queryRunner.manager.create(Loan, {
                book: book,
                reader: reader,
                borrowedAt: new Date(),
            });
            await queryRunner.manager.save(loan);

            
            book.availableCount -= 1;
            await queryRunner.manager.save(book);

            
            await queryRunner.commitTransaction();

            return loan;

        } catch (err) {
            
            await queryRunner.rollbackTransaction();

            
            if (err instanceof BadRequestException || err instanceof NotFoundException) {
                throw err;
            }
            throw new InternalServerErrorException('B³¹d podczas tworzenia wypo¿yczenia');
        } finally {
            
            await queryRunner.release();
        }
    }

    
    findAll() {
        return this.dataSource.getRepository(Loan).find({
            relations: ['book', 'reader'],
            order: { borrowedAt: 'DESC' }
        });
    }

    
    async returnBook(loanId: string) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const loan = await queryRunner.manager.findOne(Loan, {
                where: { id: loanId },
                relations: ['book']
            });

            if (!loan || loan.returnedAt) {
                throw new BadRequestException('Wypo¿yczenie nie istnieje lub zosta³o ju¿ zwrócone.');
            }

            
            loan.returnedAt = new Date();
            await queryRunner.manager.save(loan);

            
            loan.book.availableCount += 1;
            await queryRunner.manager.save(loan.book);

            await queryRunner.commitTransaction();
            return { message: 'Ksi¹¿ka zwrócona' };
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
}