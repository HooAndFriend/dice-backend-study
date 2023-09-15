// ** Typeorm Imports
import { QueryBuilder, Repository } from 'typeorm';

// ** Custom Module Imports
import { CustomRepository } from 'src/repository/typeorm-ex.decorator';
import Phone from '../domain/phone.entity';
import RequestPhoneFindDto from '../dto/phone.find.';

@CustomRepository(Phone)
export default class PhoneRepository extends Repository<Phone> {
  public async findAll(dto: RequestPhoneFindDto, userId: number) {
    const queryBuilder = this.createQueryBuilder('phone') // ** phone entity 선택
      .select(['phone.id', 'phone.name', 'phone.number', 'phone.createdAt']) // ** 원하는 컬럼 선택
      .where('phone.userId = :userId', { userId }); // ** 조건문

    // ** Request에 페이징이 있으면 where
    if (dto.page && dto.pageSize) {
      queryBuilder.skip(dto.page * dto.pageSize).take(dto.pageSize);
    }

    // ** Request에 name 있으면 where
    if (dto.name) {
      queryBuilder.where('phone.name LIKE :name', {
        name: `%${dto.name}%`,
      });
    }

    // ** Request에 number 있으면 where
    if (dto.number) {
      queryBuilder.where('phone.number LIKE :number', {
        number: `%${dto.number}%`,
      });
    }

    // ** 쿼리 결과 리턴
    return await queryBuilder.getManyAndCount();

  }
  public async checkUser(id: number, userId: number) {
    const result = await this.createQueryBuilder('phone')
      .select(['phone.id', 'phone.userId', 'phone.name', 'phone.number', 'phone.createdAt']) // 원하는 컬럼 선택
      .where('phone.id = :id', { id })
      .andWhere('phone.userId = :userId', { userId })
      .getOne();
  
    return result;
  }

  
}
