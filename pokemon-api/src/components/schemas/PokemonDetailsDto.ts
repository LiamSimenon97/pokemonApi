import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class PokemonDetailsDto {
  @ApiProperty({
    type: 'integer',
    format: 'int64',
  })
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({
    type: 'integer',
    format: 'double',
  })
  height: Decimal
  @ApiProperty({
    type: 'integer',
    format: 'double',
  })
  weight: Decimal;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  order: number;
  @ApiProperty()
  species: string;
  @ApiProperty()
  form: string;
}
