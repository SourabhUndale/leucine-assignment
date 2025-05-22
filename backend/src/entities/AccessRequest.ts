import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Software } from "./Software";

@Entity()
export class AccessRequest {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.id)
  user!: User;

  @ManyToOne(() => Software, (software) => software.id)
  software!: Software;

  @Column()
  accessType!: 'Read' | 'Write' | 'Admin';

  @Column()
  reason!: string;

  @Column()
  status!: 'Pending' | 'Approved' | 'Rejected';
}
