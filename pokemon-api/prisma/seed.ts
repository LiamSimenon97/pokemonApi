import { Module } from '@nestjs/common';
import { promises as fs } from 'fs';

Main();

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({});


@Module({})
export class SeedModule {}

async function Main() {
  const file = await fs.readFile(
    process.cwd() + '/prisma/pokemons.json',
    'utf8',
  );
  const data = JSON.parse(file);
  data.forEach(async (data) => {
      const pokemonToCreate = await prisma.pokemon.create({
        data: {
          name: data.name,
          sprites: {
            create: {
              front_default: data.sprites.front_default,
            },
          },
          types: {
            create: data.types.map((typeData) => ({
              slot: typeData.slot,
              type: {
                create: {
                  name: typeData.type.name,
                },
              },
            })),
          },
        },
      }).catch((err) => {
        console.log(err);
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
            create: data.types.map((typeData) => ({
              slot: typeData.slot,
              type: {
                create: {
                  name: typeData.type.name,
                },
              },
            })),
          },
          height: data.height,
          weight: data.weight,
          moves: {
            create: data.moves.map((moveData) => ({
              move: moveData.move.name,
              version_group_details: {
                create: moveData.version_group_details.map((versionGroupDetailData) => ({
                  level_learned_at: versionGroupDetailData.level_learned_at,
                  move_learn_method: versionGroupDetailData.move_learn_method.name,
                  version_group: versionGroupDetailData.version_group.name,
                })),
              },
            })),
          },
          order: data.order,
          species: data.species.name,
          stats: {
            create: data.stats.map((statData) => ({
              base_stat: statData.base_stat,
              effort: statData.effort,
              stat: statData.stat.name,
            })),
          },
          abilities: {
            create: data.abilities.map((abilityData) => ({
              ability: abilityData.ability.name,
              is_hidden: abilityData.is_hidden,
              slot: abilityData.slot,
            })),
          },
          form: data.forms[0].name,
        },
      });
    });
}
