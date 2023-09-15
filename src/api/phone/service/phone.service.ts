// ** Nest Imports
import { Injectable, NotFoundException } from '@nestjs/common';
import PhoneRepository from '../repository/phone.repository';

// ** enum, dto, entity, types Imports
import CommonResponse from 'src/common/dto/api.response';
import RequestPhoneSaveDto from '../dto/phone.save.dto';
import { BadRequestException } from 'src/exception/customException';
import User from 'src/api/auth/domain/user.entity';

@Injectable()
export default class PhoneService {
  constructor(private readonly phoneRepository: PhoneRepository) {}

  public async savePhone(
    dto: RequestPhoneSaveDto,
    user: User,
  ): Promise<CommonResponse<any>> {
    const findPhone = await this.phoneRepository.findOne({
      where: { number: dto.phone },
    });

    if (findPhone) {
      throw new BadRequestException('이미 존재하는 번호입니다.');
    }

    await this.phoneRepository.save(
      this.phoneRepository.create({
        name: dto.name,
        number: dto.phone,
        user,
      }),
    );

    return CommonResponse.of({
      statusCode: 200,
      message: '전화번호를 생성합니다.',
    });
  }

  public async findPhone(id: number, user: User): Promise<CommonResponse<any>> {
    const findPhone = await this.phoneRepository.findOneByUser(id, user.id);

    if (!findPhone) {
      throw new NotFoundException('전화번호를 찾을 수 없습니다.');
    }

    return CommonResponse.of({
      statusCode: 200,
      message: '전화번호를 조회합니다.',
      data: findPhone,
    });
  }

  public async findAll(user: User): Promise<CommonResponse<any>> {
    const [findPhoneList, count] = await this.phoneRepository.findAllByUser(
      user.id,
    );

    return CommonResponse.of({
      statusCode: 200,
      message: '전화번호를 전체 조회합니다.',
      data: { findPhoneList, count },
    });
  }

  public async updatePhone(
    id: number,
    user: User,
    dto: RequestPhoneSaveDto,
  ): Promise<CommonResponse<any>> {
    const findPhone = await this.phoneRepository.findOneByUser(id, user.id);

    if (!findPhone) {
      throw new NotFoundException('전화번호를 찾을 수 없습니다.');
    }

    findPhone.name = dto.name;
    findPhone.number = dto.phone;

    await this.phoneRepository.save(findPhone);

    return CommonResponse.of({
      statusCode: 200,
      message: '전화번호를 수정합니다.',
    });
  }

  public async deletePhone(
    id: number,
    user: User,
  ): Promise<CommonResponse<any>> {
    const findPhone = await this.phoneRepository.findOneByUser(id, user.id);

    if (!findPhone) {
      throw new NotFoundException('전화번호를 찾을 수 없습니다.');
    }

    await this.phoneRepository.delete(id);

    return CommonResponse.of({
      statusCode: 200,
      message: '전화번호를 삭제합니다.',
    });
  }
}
