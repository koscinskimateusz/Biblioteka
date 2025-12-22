/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';

@Controller('loans')
export class LoansController {
    constructor(private readonly loansService: LoansService) { }

    @Post()
    create(@Body() createLoanDto: CreateLoanDto) {
        return this.loansService.create(createLoanDto);
    }

    @Get()
    findAll() {
        return this.loansService.findAll();
    }

    @Patch(':id/return')
    returnBook(@Param('id') id: string) {
        return this.loansService.returnBook(id);
    }
}