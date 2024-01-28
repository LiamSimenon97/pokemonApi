import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { SeedModule } from 'prisma/seed';
import { TeamModule } from './team/team.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { TeamController } from './team/team.controller';

@Module({
  imports: [PrismaModule, PokemonModule, TeamModule],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthMiddleware).forRoutes(TeamController);
  }
  
}
