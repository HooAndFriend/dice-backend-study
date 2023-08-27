// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsString } from 'class-validator';

export default class RequestPhoneSaveDto {
  @ApiProperty({ example: '임유나', type: 'string' })
  @IsString()
  name: string;

  @ApiProperty({ example: '01033618490', type: 'string' })
  @IsString()
  phone: string;
}
