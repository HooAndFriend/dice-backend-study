// ** Nest Imports
import { Injectable } from '@nestjs/common';
import PhoneRepository from '../repository/phone.repository';

// ** enum, dto, entity, types Imports
import CommonResponse from 'src/common/dto/api.response';
import RequestPhoneSaveDto from '../dto/phone.save.dto';
import { BadRequestException } from 'src/exception/customException';

@Injectable()
export default class PhoneServiceImpl {
  constructor(private readonly phoneRepository: PhoneRepository) {}

  public async savePhone(
    dto: RequestPhoneSaveDto,
  ): Promise<CommonResponse<any>> {
    const findPhone = await this.phoneRepository.findOne({
      where: { number: dto.phone },
    });

    if (findPhone) {
      throw new BadRequestException('Exist Phone Number');
    }

    await this.phoneRepository.save(
      this.phoneRepository.create({
        name: dto.name,
        number: dto.phone,
      }),
    );

    return CommonResponse.of({
      statusCode: 200,
      message: '전화번호를 생성합니다.',
    });
  }
}
