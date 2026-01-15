/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('loans')
export class LoansController {
    constructor(private readonly loansService: LoansService) { }
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createLoanDto: CreateLoanDto) {
        return this.loansService.create(createLoanDto);
    }
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.loansService.findAll();
    }
    @UseGuards(JwtAuthGuard)
    @Patch(':id/return')
    returnBook(@Param('id') id: string) {
        return this.loansService.returnBook(id);
    }
}