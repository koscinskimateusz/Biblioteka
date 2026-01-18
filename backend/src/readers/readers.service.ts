/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Reader } from '../entities/reader.entity';
import { CreateReaderDto } from './dto/create-reader.dto';
import { Loan } from '../entities/loan.entity';

@Injectable()
export class ReadersService {
    constructor(@InjectRepository(Reader) private repo: Repository<Reader>) { }

    async create(data: CreateReaderDto) {
        const reader = this.repo.create(data);

        try {
            return await this.repo.save(reader);
        } catch (error) {
            
            if (error.code === '23505') {
                throw new ConflictException('Podany adres email jest ju¿ zarejestrowany w systemie.');
            }
            throw new InternalServerErrorException();
        }
    }

    findAll() {
        return this.repo.find({
            order: { lastName: 'ASC' } 
        });
    }

    
    findOne(id: string) {
        return this.repo.findOneBy({ id });
    }

    async remove(id: string) {
        
        const activeLoans = await this.repo.manager.count(Loan, {
            where: {
                reader: { id: id },
                returnedAt: IsNull() 
            }
        });

        if (activeLoans > 0) {
            throw new ConflictException('Nie mo¿na usun¹æ czytelnika, który ma niezwrócone ksi¹¿ki!');
        }

        
        const result = await this.repo.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException('Nie znaleziono czytelnika o podanym ID');
        }

        return result;
    }
}