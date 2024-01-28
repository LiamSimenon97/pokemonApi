import { ApiProperty } from '@nestjs/swagger';


export class PokemonDto {
  @ApiProperty({
    type: 'integer',
    format: 'int64',
  })
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  types: string[];
  @ApiProperty()
  sprites: string;
}
