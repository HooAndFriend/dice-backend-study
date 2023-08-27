// ** Nest Imports
import { Injectable, NotFoundException } from '@nestjs/common';
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

  //단일 조회
  public async findOnePhone(
    id: number,
    ):  Promise<CommonResponse<any>> {
    const phone = await this.phoneRepository.findOne({where: {id,}});

    if (!phone) {
      throw new NotFoundException('Phone not found');
    }

    return CommonResponse.of({
      statusCode: 200,
      message: '전화번호를 조회합니다.',
      data: phone
    });
  }

  //전체 조회
  public async findAllPhone(): Promise<CommonResponse<any>>{
    
    const phones = await this.phoneRepository.find();

    return CommonResponse.of({
      statusCode: 200,
      message: '전화번호를 조회합니다.',
      data: phones
    });
  }

  public async updatePhone(
    id : number,
    dto: RequestPhoneSaveDto,
  ): Promise<CommonResponse<any>>{
    const updatePhone = await this.phoneRepository.findOne({where: {id,}});

    if (!updatePhone) {
      throw new NotFoundException('Phone not found');
    }

    await this.phoneRepository.update(id, dto);

    return CommonResponse.of({
      statusCode: 200,
      message: '전화번호를 업데이트합니다.',
      data: updatePhone
    });
  }

  public async deletePhone(
    id : number,
  ): Promise<CommonResponse<any>>{

    const deletePhone = await this.phoneRepository.findOne({where: {id,}})

    if (!deletePhone) {
      throw new NotFoundException('Phone not found');
    }

    await this.phoneRepository.delete(id)

    return CommonResponse.of({
      statusCode: 200,
      message: '전화번호를 삭제합니다.',
      data: deletePhone
    });
  }

}
