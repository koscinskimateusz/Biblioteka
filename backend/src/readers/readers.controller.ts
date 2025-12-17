/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get } from '@nestjs/common';
import { ReadersService } from './readers.service';

@Controller('readers')
export class ReadersController {
    constructor(private readonly service: ReadersService) { }

    @Post()
    create(@Body() body: any) {
        return this.service.create(body);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }
}