/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { DataSource, IsNull } from 'typeorm'; // <--- DataSource do transakcji
import { Loan } from '../entities/loan.entity';
import { Book } from '../entities/book.entity';
import { Reader } from '../entities/reader.entity';
import { CreateLoanDto } from './dto/create-loan.dto';

@Injectable()
export class LoansService {
    constructor(private dataSource: DataSource) { }

    async create(createLoanDto: CreateLoanDto) {
        const { bookId, readerId } = createLoanDto;

        // Uruchamiamy transakcjê. Jeœli coœ pójdzie nie tak, baza cofnie zmiany.
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // 1. Pobierz Ksi¹¿kê (z blokad¹ pesymistyczn¹, ¿eby nikt jej nie podkrad³ w milisekundzie)
            const book = await queryRunner.manager.findOne(Book, {
                where: { id: bookId }
                // lock: { mode: 'pessimistic_write' } // Opcjonalne: dla bardzo du¿ego ruchu
            });

            if (!book) {
                throw new NotFoundException('Nie znaleziono takiej ksi¹¿ki.');
            }

            if (book.availableCount <= 0) {
                throw new BadRequestException('Brak dostêpnych egzemplarzy tej ksi¹¿ki!');
            }

            // 2. Pobierz Czytelnika
            const reader = await queryRunner.manager.findOne(Reader, { where: { id: readerId } });
            if (!reader) {
                throw new NotFoundException('Nie znaleziono czytelnika.');
            }

            // 3. Utwórz Wypo¿yczenie
            const loan = queryRunner.manager.create(Loan, {
                book: book,
                reader: reader,
                borrowedAt: new Date(),
            });
            await queryRunner.manager.save(loan);

            // 4. Zmniejsz stan magazynowy
            book.availableCount -= 1;
            await queryRunner.manager.save(book);

            // 5. ZatwierdŸ transakcjê
            await queryRunner.commitTransaction();

            return loan;

        } catch (err) {
            // W razie b³êdu wycofaj wszystko
            await queryRunner.rollbackTransaction();

            // Przeka¿ b³¹d dalej (chyba ¿e to b³¹d bazy, to rzuæ ogólny)
            if (err instanceof BadRequestException || err instanceof NotFoundException) {
                throw err;
            }
            throw new InternalServerErrorException('B³¹d podczas tworzenia wypo¿yczenia');
        } finally {
            // Zwolnij po³¹czenie
            await queryRunner.release();
        }
    }

    // Pobieranie listy (z relacjami)
    findAll() {
        return this.dataSource.getRepository(Loan).find({
            relations: ['book', 'reader'],
            order: { borrowedAt: 'DESC' }
        });
    }

    // Zwrot ksi¹¿ki (dla kompletnoœci)
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

            // Ustaw datê zwrotu
            loan.returnedAt = new Date();
            await queryRunner.manager.save(loan);

            // Zwiêksz stan magazynowy
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