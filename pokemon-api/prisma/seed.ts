import { Module } from '@nestjs/common';
import { Pokemon, PokemonDetails, Sprites, Type, Types } from '@prisma/client';
import { promises as fs } from 'fs';

Main();

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Module({})
export class SeedModule {}

async function Main() {
  const file = await fs.readFile(
    process.cwd() + '/prisma/pokemons.json',
    'utf8',
  );
  const data = JSON.parse(file);

  data.forEach(async (data) => {
    const pokemonToCreate = await prisma.pokemon.upsert({
      where: { name: data.name },
      update: {},
      create: {
        name: data.name,
        sprites: {
          create: {
            front_default: data.sprites.front_default,
          },
        },
        types: {
          create: [
            {
              slot: data.types[0].slot,
              type: {
                connectOrCreate: {
                  where: {
                    name: data.types[0].type.name,
                  },
                  create: {
                    name: data.types[0].type.name,
                  },
                },
              },
            },
          ],
        },
      },
    });
    const pokemonDetails = await prisma.pokemonDetails.create({
      data: {
        name: data.name,
        sprites: {
          create: {
            front_default: data.sprites.front_default,
            front_female: data.sprites.front_female,
            front_shiny: data.sprites.front_shiny,
            front_shiny_female: data.sprites.front_shiny_female,
            back_default: data.sprites.back_default,
            back_female: data.sprites.back_female,
            back_shiny: data.sprites.back_shiny,
            back_shiny_female: data.sprites.back_shiny_female,
          },
        },
        types: {
          create: [
            {
              slot: data.types[0].slot,
              type: {
                connectOrCreate: {
                  where: {
                    name: data.types[0].type.name,
                  },
                  create: {
                    name: data.types[0].type.name,
                  },
                },
              },
            },
          ],
        },
        height: data.height,
        weight: data.weight,
        moves: {
          create: [
            {
              move: data.moves[0].move.name,
              version_group_details: {
                create: [
                  {
                    level_learned_at:
                      data.moves[0].version_group_details[0].level_learned_at,
                    move_learn_method:
                      data.moves[0].version_group_details[0].move_learn_method
                        .name,
                    version_group:
                      data.moves[0].version_group_details[0].version_group.name,
                  },
                ],
              },
            },
          ],
        },
        order: data.order,
        species: data.species.name,
        stats: {
          create: [
            {
              base_stat: data.stats[0].base_stat,
              effort: data.stats[0].effort,
              stat: data.stats[0].stat.name,
            },
          ],
        },
        abilities: {
          create: [
            {
              ability: data.abilities[0].ability.name,
              is_hidden: data.abilities[0].is_hidden,
              slot: data.abilities[0].slot,
            },
          ],
        },
        form: data.forms[0].name,
      },
    });
  });
}
