import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { SeedModule } from 'prisma/seed';
import { TeamModule } from './team/team.module';

@Module({
  imports: [PrismaModule, PokemonModule, TeamModule],
})
export class AppModule {
}
