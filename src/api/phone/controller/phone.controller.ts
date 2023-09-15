// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

// ** enum, dto, entity Imports

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import RequestPhoneSaveDto from '../dto/phone.save.dto';
import CommonResponse from 'src/common/dto/api.response';
import PhoneServiceImpl from '../service/phone.service';
import { RequestWithUsernDto } from 'src/common/dto/request.user.dto';
import JwtAccessGuard from 'src/api/auth/passport/auth.jwt-access.guard';
import { PhoneResponse } from 'src/response/phone.response';

@ApiTags('Phone')
@Controller('phone')
export default class PhoneController {
  constructor(private readonly phoneService: PhoneServiceImpl) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '전화번호 저장' })
  @ApiBody({ type: RequestPhoneSaveDto })
  @ApiResponse(PhoneResponse.savePhone[200])
  @ApiResponse(PhoneResponse.savePhone[400])
  @UseGuards(JwtAccessGuard)
  @Post()
  public async savePhone(
    @Body() dto: RequestPhoneSaveDto,
    @Req() { user }: RequestWithUsernDto,
  ): Promise<CommonResponse<any>> {
    return await this.phoneService.savePhone(dto, user);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '전화번호 전체 조회' })
  @ApiResponse(PhoneResponse.findAll[200])
  @UseGuards(JwtAccessGuard)
  @Get()
  public async findAll(
    @Req() { user }: RequestWithUsernDto,
  ): Promise<CommonResponse<any>> {
    return await this.phoneService.findAll(user);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '전화번호 조회' })
  @ApiResponse(PhoneResponse.findPhone[200])
  @ApiResponse(PhoneResponse.findPhone[404])
  @UseGuards(JwtAccessGuard)
  @Get('/:id')
  public async findPhone(
    @Param('id') id: number,
    @Req() { user }: RequestWithUsernDto,
  ): Promise<CommonResponse<any>> {
    return await this.phoneService.findPhone(id, user);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '전화번호 수정' })
  @ApiBody({ type: RequestPhoneSaveDto })
  @ApiResponse(PhoneResponse.updatePhone[200])
  @ApiResponse(PhoneResponse.updatePhone[404])
  @UseGuards(JwtAccessGuard)
  @Patch('/:id')
  public async updatePhone(
    @Param('id') id: number,
    @Req() { user }: RequestWithUsernDto,
    @Body() dto: RequestPhoneSaveDto,
  ): Promise<CommonResponse<any>> {
    return await this.phoneService.updatePhone(id, user, dto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '전화번호 삭제' })
  @ApiResponse(PhoneResponse.deletePhone[200])
  @ApiResponse(PhoneResponse.deletePhone[404])
  @UseGuards(JwtAccessGuard)
  @Delete('/:id')
  public async deletePhone(
    @Param('id') id: number,
    @Req() { user }: RequestWithUsernDto,
  ): Promise<CommonResponse<any>> {
    return await this.phoneService.deletePhone(id, user);
  }
}
