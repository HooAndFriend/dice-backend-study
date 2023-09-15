import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import RequestPagingDto from 'src/common/dto/paging.dto';

export default class RequestPhoneFindDto extends RequestPagingDto {
  @ApiProperty({ example: '01057027017', type: 'string', required: false })
  @IsOptional()
  @IsString()
  number: string;

  @ApiProperty({ example: '김주만', type: 'string', required: false })
  @IsOptional()
  @IsString()
  name: string;
}
