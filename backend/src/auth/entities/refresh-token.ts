import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Import the User entity

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  token: string;

  @Column({ unique: true })
  expiryDate: Date;

  // Define the Many-to-One relationship
  @ManyToOne(() => User, (user) => user.refreshTokens)
  @JoinColumn({ name: 'userId' }) // This column in RefreshToken table will store the ID of the User
  user: User;
}
