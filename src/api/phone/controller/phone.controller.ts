// ** Nest Imports
import { Body, Controller, Post } from '@nestjs/common';

// ** enum, dto, entity Imports

// ** Swagger Imports
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import RequestPhoneSaveDto from '../dto/phone.save.dto';
import CommonResponse from 'src/common/dto/api.response';
import PhoneServiceImpl from '../service/phone.service';

@ApiTags('Phone')
@Controller('phone')
export default class PhoneController {
  constructor(private readonly phoneService: PhoneServiceImpl) {}

  @ApiOperation({ summary: '전화번호 저장' })
  @ApiBody({ type: RequestPhoneSaveDto })
  @ApiCreatedResponse({
    status: 200,
    description: '전화번호 저장',
    type: CommonResponse,
  })
  @Post()
  public async savePhone(
    @Body() dto: RequestPhoneSaveDto,
  ): Promise<CommonResponse<any>> {
    return await this.phoneService.savePhone(dto);
  }
}


