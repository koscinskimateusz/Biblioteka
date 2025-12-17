/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reader } from '../entities/reader.entity';

@Injectable()
export class ReadersService {
    constructor(@InjectRepository(Reader) private repo: Repository<Reader>) { }

    create(data: Partial<Reader>) {
        return this.repo.save(this.repo.create(data));
    }

    findAll() { // Dodane, ¿ebyœ móg³ ich wyœwietliæ na liœcie
        return this.repo.find();
    }
}