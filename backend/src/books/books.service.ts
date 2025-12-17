/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';

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

    findOne(id: string) {
        return this.booksRepo.findOneBy({ id });
    }

    create(data: Partial<Book>) {
        const book = this.booksRepo.create(data);
        return this.booksRepo.save(book);
    }

    async update(id: string, data: Partial<Book>) {
        await this.booksRepo.update(id, data);
        return this.findOne(id);
    }

    remove(id: string) {
        return this.booksRepo.delete(id);
    }
}