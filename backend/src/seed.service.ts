/* eslint-disable prettier/prettier */
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


import { Book } from './entities/book.entity';
import { Reader } from './entities/reader.entity';
import { User } from './entities/user.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(Book) private bookRepo: Repository<Book>,
        @InjectRepository(Reader) private readerRepo: Repository<Reader>,
        @InjectRepository(User) private userRepo: Repository<User>,
    ) { }

   
    async onApplicationBootstrap() {
        await this.seedUsers();
        await this.seedBooks();
        await this.seedReaders();
        console.log('Seeding complete');
    }

    
    async seedUsers() {
        const count = await this.userRepo.count();
        if (count === 0) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await this.userRepo.save({
                username: 'admin',
                password: hashedPassword,
            });
            console.log('Dodano użytkownika: admin');
        }
    }

    
    async seedBooks() {
        const count = await this.bookRepo.count();
        if (count === 0) {
            const books = [
                { title: 'Władca Pierścieni: Drużyna Pierścienia', author: 'J.R.R. Tolkien', isbn: '978-83-7319-172-3', availableCount: 5 },
                { title: 'Czysty Kod', author: 'Robert C. Martin', isbn: '978-83-283-0234-1', availableCount: 0 },
                { title: 'Wiedźmin: Ostatnie Życzenie', author: 'Andrzej Sapkowski', isbn: '978-83-7578-063-5', availableCount: 10 },
                { title: 'Harry Potter i Kamień Filozoficzny', author: 'J.K. Rowling', isbn: '978-83-8008-211-3', availableCount: 2 },
                { title: 'Diuna', author: 'Frank Herbert', isbn: '978-83-7510-348-9', availableCount: 2 },
                { title: 'Dzieci Diuny', author: 'Frank Herbert', isbn: '948-23-7010-148-7', availableCount: 2 },
            ];
            await this.bookRepo.save(books);
            console.log('Dodano przykładowe książki');
        }
    }

   
    async seedReaders() {
        const count = await this.readerRepo.count();
        if (count === 0) {
            const readers = [
                { firstName: 'Jan', lastName: 'Kowalski', email: 'jan.kowalski@example.com' },
                { firstName: 'Anna', lastName: 'Nowak', email: 'anna.nowak@example.com' },
                { firstName: 'Mateusz', lastName: 'Kościński', email: 'mateusz.koscinski@example.com' },
            ];
            await this.readerRepo.save(readers);
            console.log(' Dodano przykładowych czytelników');
        }
    }
}