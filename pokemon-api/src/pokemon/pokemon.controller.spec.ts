import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService, Sort } from './pokemon.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Pokemon } from 'pokenode-ts';

describe('PokemonController', () => {
  let controller: PokemonController;
  let pokemonService: Pick<jest.MockedObject<PokemonService>, 'getAllPokemons' | 'getPokemonById' | 'getPokemonByName' | 'getPokemonByType' | 'getPokemonsPaginated'>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        PokemonService,
        PrismaService,
      ],
    }).compile();
    pokemonService = module.get(PokemonService);
    controller = module.get<PokemonController>(PokemonController);
  });
  describe('getPokemonById', () => {
    it('should return a pokemon', async () => {
      const result = {
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
      }; 
      jest.spyOn(pokemonService, 'getPokemonById' as any).mockResolvedValueOnce(result);
      expect(await controller.getPokemonById(1)).toBe(result);
    });
  });
});
