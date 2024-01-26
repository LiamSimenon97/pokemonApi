import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { SeedModule } from 'prisma/seed';

@Module({
  imports: [PrismaModule, PokemonModule],
})
export class AppModule {
}
