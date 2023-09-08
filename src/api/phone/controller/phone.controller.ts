// ** Nest Imports
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

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

  @ApiOperation({ summary: '전화번호 전체 조회' })
  @ApiCreatedResponse({
    status: 200,
    description: '전화번호 전체 조회',
    type: CommonResponse,
  })
  @Get()
  public async findAll() : Promise<CommonResponse<any>> {
    return await this.phoneService.findAll();
  }

  @ApiOperation({ summary: '전화번호 조회' })
  @ApiCreatedResponse({
    status: 200,
    description: '전화번호 조회',
    type: CommonResponse,
  })
  @Get('/:id')
  public async findPhone(
    @Param('id') id: number
  ) : Promise<CommonResponse<any>> {
    return await this.phoneService.findPhone(id);
  }

  @ApiOperation({ summary: '전화번호 수정' })
  @ApiBody({ type: RequestPhoneSaveDto })
  @ApiCreatedResponse({
    status: 200,
    description: '전화번호 수정',
    type: CommonResponse,
  })
  @Patch('/:id')
  public async updatePhone(
    @Param('id') id: number, 
    @Body() dto: RequestPhoneSaveDto
  ): Promise<CommonResponse<any>> {
    return await this.phoneService.updatePhone(id, dto);
  }

  @ApiOperation({ summary: '전화번호 삭제' })
  @ApiCreatedResponse({
    status: 200,
    description: '전화번호 삭제',
    type: CommonResponse,
  })
  @Delete('/:id')
  public async deletePhone(
    @Param('id') id: number
  ) : Promise<CommonResponse<any>> {
    return await this.phoneService.deletePhone(id);
  }

}