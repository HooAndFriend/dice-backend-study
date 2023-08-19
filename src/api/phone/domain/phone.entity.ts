// ** Typeorm Imports
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from 'src/common/entity/BaseTime.Entity';

@Entity({ name: 'TB_PHONE_IH' })
@Unique(['number'])
export default class Phone extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, name: 'phone_name' })
  name: string;

  @Column({ type: 'varchar', length: 30, name: 'phone_number' })
  number: string;
}
