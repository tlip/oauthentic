import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AuthorizationCode {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    clientId: string;

    @Column()
    redirectUri: string;

    @Column()
    userId: string;

    @Column()
    username: string;

}
