import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RefreshToken {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column({ nullable: true })
    userId: string;

    @Column()
    clientId: string;

}
