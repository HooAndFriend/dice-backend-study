// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsOptional, IsString } from 'class-validator';

// ** Other Imports
import RequestPagingDto from 'src/common/dto/paging.dto';

export default class RequestPhoneFindDto extends RequestPagingDto {
  @ApiProperty({ example: '01063057848', required: false })
  @IsOptional()
  @IsString()
  number: string;

  @ApiProperty({ example: '김인후', required: false })
  @IsOptional()
  @IsString()
  name: string;
}
