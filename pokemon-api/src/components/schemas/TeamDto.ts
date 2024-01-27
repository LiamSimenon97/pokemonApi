import { ApiProperty } from '@nestjs/swagger';

export class TeamDto {
  @ApiProperty({
    type: 'integer',
    format: 'int64',
  })
  id: number;
  @ApiProperty()
  name: string;
}
