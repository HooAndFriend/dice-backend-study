// ** Nest Imports
import { Injectable, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import PhoneRepository from '../repository/phone.repository';

// ** enum, dto, entity, types Imports
import CommonResponse from 'src/common/dto/api.response';
import RequestPhoneSaveDto from '../dto/phone.save.dto';
import { BadRequestException } from 'src/exception/customException';
import { RolesGuard } from 'src/roles/roles.guard';
import User from 'src/api/auth/domain/user.entity';
import RequestPhoneFindDto from '../dto/phone.find.';

@Injectable()
export default class PhoneServiceImpl {
  constructor(private readonly phoneRepository: PhoneRepository) {}

  public async savePhone(
    dto: RequestPhoneSaveDto,
    user: User
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
        user
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
    user: User
    ):  Promise<CommonResponse<any>> {
    const phone = await this.phoneRepository.findOne({where: {id,}});

    if (!phone) {
      throw new NotFoundException('Phone not found');
    }
    
    if(id !== user.id){
      throw new UnauthorizedException("You do not have permission to access this phone")
    }
    else{
      return CommonResponse.of({
        statusCode: 200,
        message: '전화번호를 조회합니다.',
        data: phone
      });
    }
  }

  //전체 조회
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


  public async updatePhone(
    id: number,
    dto: RequestPhoneSaveDto,
    user: User
  ): Promise<CommonResponse<any>> {
    const updatePhone = await this.phoneRepository.checkUser(id,user.id);
  
    if (!updatePhone) {
      throw new NotFoundException('Phone not found');
    }
  
    await this.phoneRepository.update({ id }, dto);
  
    return CommonResponse.of({
      statusCode: 200,
      message: '전화번호를 업데이트합니다.',
    });
  }
  

  public async deletePhone(
    id : number,
    user: User,
  ): Promise<CommonResponse<any>>{

    const deletePhone = await this.phoneRepository.checkUser(id, user.id)

    if (!deletePhone) {
      throw new NotFoundException('Phone not found');
    }

    await this.phoneRepository.delete(id)

    return CommonResponse.of({
      statusCode: 200,
      message: '전화번호를 삭제합니다.',
    });
  }

}
