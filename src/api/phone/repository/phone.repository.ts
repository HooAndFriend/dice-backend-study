// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import { CustomRepository } from 'src/repository/typeorm-ex.decorator';
import Phone from '../domain/phone.entity';
import RequestPhoneFindDto from '../dto/phone.find.dto';

@CustomRepository(Phone)
export default class PhoneRepository extends Repository<Phone> {

    public async findOneByUser(id: number, userId: number) {
        return this.createQueryBuilder('phone')
            .select([
                'phone.id', 
                'phone.name', 
                'phone.number', 
                'phone.userId',
            ])
            .where('phone.id = :id', {id})
            .andWhere('phone.userId = :userId', {userId})
            .getOne();
    }

    public async findAllByUser(userId: number) {
        const qb = this.createQueryBuilder('phone')
            .select([
                'phone.id', 
                'phone.name', 
                'phone.number', 
                'phone.userId',
            ])
            .where('phone.userId = :userId', {userId})

            return qb.getManyAndCount();
    }


}