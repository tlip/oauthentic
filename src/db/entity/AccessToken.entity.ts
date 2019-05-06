import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AccessToken {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column({ nullable: true })
    userId: string;

    @Column()
    clientId: string;

}
