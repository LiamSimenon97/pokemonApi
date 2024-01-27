import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiProperty({
    type: 'integer',
    format: 'int64',
  })
  id: number;
  @ApiProperty()
  error: string;
  @ApiProperty()
  error_message: string;
}
