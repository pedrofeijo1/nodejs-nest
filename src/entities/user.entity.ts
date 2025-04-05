import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { UserGenderEnum } from '../enums/user-gender.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 15 })
  username: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar' })
  password: string;

  @Column({
    type: 'enum',
    enum: UserGenderEnum,
    default: UserGenderEnum.UNSPECIFIED,
  })
  gender: string;
}
