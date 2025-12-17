/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { LoansService } from './loans.service';

@Controller('loans')
export class LoansController {
    constructor(private readonly service: LoansService) { }

    @Post()
    create(@Body() body: { bookId: string; readerId: string }) {
        return this.service.create(body.bookId, body.readerId);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Patch(':id/return')
    returnBook(@Param('id') id: string) {
        return this.service.returnBook(id);
    }
}