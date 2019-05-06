import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    clientId: string;

    @Column()
    clientSecret: string;

    @Column()
    isTrusted: boolean;

}
