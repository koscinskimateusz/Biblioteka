/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, Delete} from '@nestjs/common'; // Dodaj Param jeœli planujesz edycjê
import { ReadersService } from './readers.service';
import { CreateReaderDto } from './dto/create-reader.dto';

@Controller('readers')
export class ReadersController {
    constructor(private readonly service: ReadersService) { }

    @Post()
    create(@Body() body: CreateReaderDto) {
        return this.service.create(body);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    // Opcjonalnie dla przysz³ej edycji
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}