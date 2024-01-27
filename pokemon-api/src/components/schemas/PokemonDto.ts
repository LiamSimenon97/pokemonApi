import { ApiProperty } from '@nestjs/swagger';

export class PokemonDto {
  @ApiProperty({
    type: 'integer',
    format: 'int64',
  })
  id: number;
  @ApiProperty()
  name: string;
}
