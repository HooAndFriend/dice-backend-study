// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsString } from 'class-validator';

export default class RequestPhoneSaveDto {
  @ApiProperty({ example: '김인후', type: 'string' })
  @IsString()
  name: string;

  @ApiProperty({ example: '01063057848', type: 'string' })
  @IsString()
  phone: string;
}
