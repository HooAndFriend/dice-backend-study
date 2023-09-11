// ** Nest Imports
import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Get,
  Query,
  ValidationPipe,
} from '@nestjs/common';

// ** Swagger Imports
import {
  ApiBody,
  ApiOperation,
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';

// ** enum, dto, entity Imports
import RequestPhoneSaveDto from '../dto/phone.save.dto';
import CommonResponse from 'src/common/dto/api.response';
import PhoneServiceImpl from '../service/phone.service';
import { RequestWithUsernDto } from 'src/common/dto/request.user.dto';

// ** Guard Imports
import JwtAccessGuard from 'src/api/auth/passport/auth.jwt-access.guard';
import { PhoneResponse } from 'src/response/phone.response';
import RequestPhoneFindDto from '../dto/phone.find.';

@ApiTags('Phone')
@Controller('phone')
export default class PhoneController {
  constructor(private readonly phoneService: PhoneServiceImpl) {}

  @ApiBearerAuth('access-token') // Swagger에서 Access Token 사용
  @ApiOperation({ summary: '전화번호 생성' }) // ** Api에 대한 설명
  @ApiBody({ type: RequestPhoneSaveDto }) // ** Dto에 대한 설명
  @ApiResponse(PhoneResponse.savePhone[200]) // ** Response Example Value
  @ApiResponse(PhoneResponse.savePhone[400]) // ** Response Example Value
  @UseGuards(JwtAccessGuard) // ** Jwt 검증
  @Post()
  public async savePhone(
    @Body() dto: RequestPhoneSaveDto,
    @Req() { user }: RequestWithUsernDto,
  ): Promise<CommonResponse<any>> {
    return await this.phoneService.savePhone(dto, user);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '전화번호 전체 조회' })
  @ApiResponse(PhoneResponse.findPhoneList[200])
  @UseGuards(JwtAccessGuard)
  @Get()
  public async findAll(
    @Query(ValidationPipe) params: RequestPhoneFindDto,
    @Req() { user }: RequestWithUsernDto,
  ): Promise<CommonResponse<any>> {
    return await this.phoneService.findPhoneList(params, user);
  }
}
