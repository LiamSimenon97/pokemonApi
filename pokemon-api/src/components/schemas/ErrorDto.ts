import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiProperty({
    type: 'integer',
  })
  id: number;
  @ApiProperty({type:"string"})
  error: string;
  @ApiProperty({type:"string"})
  error_message: string;
}
