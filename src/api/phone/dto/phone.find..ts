// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsOptional, IsString } from 'class-validator';

// ** Other Imports
import RequestPagingDto from 'src/common/dto/paging.dto';

export default class RequestPhoneFindDto extends RequestPagingDto {
  @ApiProperty({ example: '01033618490', required: false })
  @IsOptional()
  @IsString()
  number: string;

  @ApiProperty({ example: '임유나', required: false })
  @IsOptional()
  @IsString()
  name: string;
}
