// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsString } from 'class-validator';

export default class RequestPhoneSaveDto {
  @ApiProperty({ example: '김주만', type: 'string' })
  @IsString()
  name: string;

  @ApiProperty({ example: '01057027017', type: 'string' })
  @IsString()
  phone: string;
}