import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    type: 'integer'
  })
  id: number;
  @ApiProperty({type:"string"})
  name: string;
  @ApiProperty({type:"string"})
  email: string;
  @ApiProperty({type:"string"})
  password: string;
  @ApiProperty({type:"string", format:"date-time"})
  created_at: string;
  @ApiProperty({type:"string", format:"date-time"})
  updated_at: string;
}
