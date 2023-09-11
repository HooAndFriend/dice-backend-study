// ** Nest Imports
import { Injectable } from '@nestjs/common';
import PhoneRepository from '../repository/phone.repository';

// ** enum, dto, entity, types Imports
import CommonResponse from 'src/common/dto/api.response';
import RequestPhoneSaveDto from '../dto/phone.save.dto';
import { BadRequestException } from 'src/exception/customException';
import User from 'src/api/auth/domain/user.entity';
import RequestPhoneFindDto from '../dto/phone.find.';

@Injectable()
export default class PhoneServiceImpl {
  constructor(private readonly phoneRepository: PhoneRepository) {}

  public async savePhone(
    dto: RequestPhoneSaveDto,
    user: User,
  ): Promise<CommonResponse<any>> {
    const findPhone = await this.phoneRepository.findOne({
      where: { number: dto.phone },
    });

    if (findPhone) {
      throw new BadRequestException('이미 존재하는 번호 입니다.');
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

  public async findPhoneList(
    dto: RequestPhoneFindDto,
    user: User,
  ): Promise<CommonResponse<any>> {
    const [data, count] = await this.phoneRepository.findAll(dto, user.id);

    return CommonResponse.of({
      statusCode: 200,
      message: '전화번호 리스트를 조회합니다.',
      data: { data, count },
    });
  }
}
