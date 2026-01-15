/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Get()
    findAll(@Query('page') page: number, @Query('limit') limit: number) {
        return this.booksService.findAll(page ? Number(page) : 1,
            limit ? Number(limit) : 10);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.booksService.findOne(id);
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createBookDto: CreateBookDto) {
        return this.booksService.create(createBookDto);
    }
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.booksService.update(id, body);
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.booksService.remove(id);
    }
}