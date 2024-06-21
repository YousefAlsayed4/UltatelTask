// import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
// export class User extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column({ unique: true })
//   email: string;

//   @Column()
//   password: string;

//   @Column({ default: false })
//   isEmailConfirmed: boolean;

//   @Column({ nullable: true })
//   emailConfirmationToken: string;
// }
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
