/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, Delete} from '@nestjs/common'; 
import { ReadersService } from './readers.service';
import { CreateReaderDto } from './dto/create-reader.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('readers')
export class ReadersController {
    constructor(private readonly service: ReadersService) { }
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() body: CreateReaderDto) {
        return this.service.create(body);
    }
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.service.findAll();
    }
    @UseGuards(JwtAuthGuard)
    
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}