import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import  * as fs  from 'fs';

const prisma = new PrismaClient();

export async function importData(nameOrId: string): Promise<void> {
  let url = `https://pokeapi.co/api/v2/pokemon/${nameOrId}`;
  
  try {
    const response = await axios.get(url);
    const data = response.data;
    const imageUrl = data.sprites.front_default;
    const pokemonToCreate = await prisma.pokemon
      .create({
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
      })
      .catch((err) => {
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
              create: moveData.version_group_details.map(
                (versionGroupDetailData) => ({
                  level_learned_at: versionGroupDetailData.level_learned_at,
                  move_learn_method:
                    versionGroupDetailData.move_learn_method.name,
                  version_group: versionGroupDetailData.version_group.name,
                }),
              ),
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
    if (pokemonToCreate && pokemonDetails) {
      saveImageFromApi(imageUrl, `importData/imagesSaved/${data.name}.png`)
      console.log('Pokemon created successfully.');
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

async function saveImageFromApi(url, localPath) {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
    });
    fs.writeFileSync(localPath, response.data);
    console.log('Image saved successfully.');
  } catch (error) {
    console.error('Error saving image:', error.message);
  }
}
