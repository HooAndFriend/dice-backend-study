// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from 'src/common/entity/BaseTime.Entity';
import User from 'src/api/auth/domain/user.entity';

@Entity({ name: 'TB_PHONE_IH' })
@Unique(['number'])
export default class Phone extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, name: 'phone_name' })
  name: string;

  @Column({ type: 'varchar', length: 30, name: 'phone_number' })
  number: string;

  /**
   * OneToMany
   */
  @ManyToOne(() => User, (user) => user.phone)
  user: User;
}
