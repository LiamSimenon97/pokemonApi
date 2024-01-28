import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService, Sort } from './pokemon.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

describe('PokemonController', () => {
  let controller: PokemonController;
  let pokemonService: Pick<jest.MockedObject<PokemonService>, 'getAllPokemons' | 'getPokemonById' | 'getPokemonByName' | 'getPokemonByType' | 'getPokemonsPaginated'>;
  let prisma: Pick<jest.MockedObject<PrismaService>, 'pokemon'>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
    }).compile();
    prisma = new PrismaService();
    controller = module.get<PokemonController>(PokemonController);
  });

  describe('getAllPokemons', () => {
    it('should return an array of pokemons', async () => {
      const result = [
        {
          id: 1,
          name: 'bulbasaur',
          sprites: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
          },
          types: [
            {
              type: {
                name: 'grass',
              },
            },
            {
              type: {
                name: 'poison',
              },
            },
          ],
        },
      ]; 
      // jest.spyOn(pokemonService, 'getAllPokemons').mockResolvedValue(result);
      expect(await controller.getAllPokemons(Sort.ID_ASC)).toBe(result);
    });
  }
  );
});
