/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Loan } from './loan.entity';

@Entity()
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column({ unique: true })
    isbn: string;

    @Column({ default: 1 })
    availableCount: number; // Zmieni³em na camelCase (standard w JS)

    @OneToMany(() => Loan, loan => loan.book)
    loans: Loan[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}