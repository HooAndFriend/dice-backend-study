// ** Nest Imports
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

// ** enum, dto, entity Imports

// ** Swagger Imports
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/roles/roles.decorator';
import RequestPhoneSaveDto from '../dto/phone.save.dto';
import CommonResponse from 'src/common/dto/api.response';
import PhoneServiceImpl from '../service/phone.service';
import JwtAccessGuard from 'src/api/auth/passport/auth.jwt-access.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { UserRole } from 'src/api/auth/dto/user.role';
import { Request } from 'express';
import { RequestWithUsernDto } from 'src/common/dto/request.user.dto';

@ApiTags('Phone')
@Controller('phone')
export default class PhoneController {
  constructor(private readonly phoneService: PhoneServiceImpl) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '전화번호 저장' })
  @ApiBody({ type: RequestPhoneSaveDto })
  @ApiCreatedResponse({
    status: 200,
    description: '전화번호 저장',
    type: CommonResponse,
  })
  @UseGuards(JwtAccessGuard)
  @Post()
  public async savePhone(
    @Body() dto: RequestPhoneSaveDto,
    @Req() { user }: RequestWithUsernDto,
  ): Promise<CommonResponse<any>> {
    return await this.phoneService.savePhone(dto, user);
  }
}
