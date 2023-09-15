// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import { CustomRepository } from 'src/repository/typeorm-ex.decorator';
import Phone from '../domain/phone.entity';

@CustomRepository(Phone)
export default class PhoneRepository extends Repository<Phone> {
  public async findOneByUser(id: number, userId: number) {
    return this.createQueryBuilder('phone')
      .select([
        'phone.id',
        'phone.name',
        'phone.number',
        'phone.userId',
        'phone.createdAt',
      ])
      .where('phone.id = :id', { id })
      .getOne();
  }

  public async findAllByUser(userId: number) {
    return this.createQueryBuilder('phone')
      .select([
        'phone.id',
        'phone.name',
        'phone.number',
        'phone.userId',
        'phone.createdAt',
      ])
      .where('phone.userId = :userId', { userId })
      .getManyAndCount();
  }
}
