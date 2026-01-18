/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull} from 'typeorm';
import { Book } from '../entities/book.entity';
import { Loan } from '../entities/loan.entity';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book) private booksRepo: Repository<Book>,
    ) { }

    async findAll(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;

        const [data, total] = await this.booksRepo.findAndCount({
            skip: skip,
            take: limit,
            order: { createdAt: 'DESC' },
        });
        return {
            data: data,
            total: total,
            page: page,
            lastPage: Math.ceil(total / limit),
            limit: limit
        };
    }

    async findOne(id: string) {
        const book = await this.booksRepo.findOneBy({ id });
        if (!book) throw new NotFoundException('Nie znaleziono ksi¹¿ki');
        return book;
    }

    async create(data: any) { 
        const book = this.booksRepo.create(data);
        try {
            return await this.booksRepo.save(book);
        } catch (error) {
            
            if (error.code === '23505') {
                throw new ConflictException('Ksi¹¿ka o podanym numerze ISBN ju¿ istnieje.');
            }
            throw new InternalServerErrorException();
        }
    }

    async update(id: string, data: Partial<Book>) {
        await this.booksRepo.update(id, data);
        return this.findOne(id);
    }

    async remove(id: string) {
        
        await this.findOne(id);

        const activeLoan = await this.booksRepo.manager.count(Loan, {
            where: {
                book: { id: id },
                returnedAt: IsNull() 
            }
        });

        if (activeLoan > 0) {
            throw new ConflictException('Nie mo¿na usun¹æ ksi¹¿ki, która jest obecnie wypo¿yczona!');
        }

        return this.booksRepo.delete(id);
    }
}