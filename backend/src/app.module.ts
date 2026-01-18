/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Book } from './entities/book.entity';
import { Reader } from './entities/reader.entity';
import { Loan } from './entities/loan.entity';
import { BooksModule } from './books/books.module';
import { ReadersModule } from './readers/readers.module';
import { LoansModule } from './loans/loans.module';
import { User } from './entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST || 'localhost', 
            port: parseInt(process.env.DATABASE_PORT || '5432', 10),
            username: process.env.DATABASE_USER || 'myuser',
            password: process.env.DATABASE_PASSWORD || 'mypassword',
            database: process.env.DATABASE_NAME || 'mydatabase',
            entities: [Book, Reader, Loan, User], 
            synchronize: true, 
        }),
        BooksModule,
        ReadersModule,
        LoansModule,
        UsersModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }