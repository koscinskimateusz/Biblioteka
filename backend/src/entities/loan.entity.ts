/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Book } from './book.entity';
import { Reader } from './reader.entity';

@Entity()
export class Loan {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    borrowedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    returnedAt: Date;

    // Relacja Wiele-do-Jednego (Wiele wypo¿yczeñ dotyczy jednej ksi¹¿ki)
    @ManyToOne(() => Book, book => book.loans, { onDelete: 'CASCADE' })
    book: Book;

    // Relacja Wiele-do-Jednego (Wiele wypo¿yczeñ nale¿y do jednego czytelnika)
    @ManyToOne(() => Reader, reader => reader.loans, { onDelete: 'CASCADE' })
    reader: Reader;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}