/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { ReadersModule } from './readers/readers.module';
import { LoansModule } from './loans/loans.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SeedService } from './seed.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Book } from './entities/book.entity';
import { Reader } from './entities/reader.entity';
import { User } from './entities/user.entity';


@Module({
    imports: [

        ConfigModule.forRoot({
            isGlobal: true,
        }),
        //TypeOrmModule.forRoot({
        //    type: 'postgres',
        //    host: process.env.DATABASE_HOST || 'localhost',
        //    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
        //    username: process.env.DATABASE_USER || 'myuser',
        //    password: process.env.DATABASE_PASSWORD || 'mypassword',
        //    database: process.env.DATABASE_NAME || 'mydatabase',
        //    entities: [Book, Reader, Loan, User],
        //    synchronize: true,
        //}),

        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_DATABASE'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true, 
            }),
        }),
        TypeOrmModule.forFeature([Book, Reader, User]),

        BooksModule,
        ReadersModule,
        LoansModule,
        AuthModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService, SeedService],
})
export class AppModule { }