// ** Nest Imports
import { Injectable, NotFoundException } from '@nestjs/common';
import PhoneRepository from '../repository/phone.repository';

// ** enum, dto, entity, types Imports
import CommonResponse from 'src/common/dto/api.response';
import RequestPhoneSaveDto from '../dto/phone.save.dto';
import { BadRequestException } from 'src/exception/customException';

@Injectable()
export default class PhoneService {
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

  public async findPhone(
    id: number
  ): Promise<CommonResponse<any>> {
    
    const findPhone = await this.phoneRepository.findOne({
      where: { id },
    });

    if (!findPhone) {
      throw new NotFoundException('Phone NOT Found');
    }

    return CommonResponse.of({
      statusCode: 200,
      message: '전화번호를 조회했습니다.',
      data: findPhone,
    });

  }

  public async findAll(): Promise<CommonResponse<any>> {

    const findPhoneList = await this.phoneRepository.find();

    return CommonResponse.of({
      statusCode: 200,
      message: '전화번호를 전체 조회했습니다.',
      data: findPhoneList,
    });
  }

  public async updatePhone(
    id: number,
    dto: RequestPhoneSaveDto
  ): Promise<CommonResponse<any>> {

    const findPhone = await this.phoneRepository.findOne({
      where: { id },
    });

    if (!findPhone) {
      throw new NotFoundException('Phone NOT Found');
    }

    findPhone.name = dto.name
    findPhone.number = dto.phone

    this.phoneRepository.save(findPhone)

    return CommonResponse.of({
      statusCode: 200,
      message: '전화번호를 수정합니다.',
    });

  }

  public async deletePhone(
    id: number
  ): Promise<CommonResponse<any>> {

    const findPhone = await this.phoneRepository.findOne({
      where: { id },
    });

    if (!findPhone) {
      throw new NotFoundException('Phone NOT Found');
    }

    this.phoneRepository.delete(id)

    return CommonResponse.of({
      statusCode: 200,
      message: '전화번호를 삭제합니다.',
    });
  }

}
