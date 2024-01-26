import { Controller, Post } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { promises as fs } from 'fs';

@Controller('pokemon')
export class PokemonController {
    constructor(private pokemonService: PokemonService) {}
    @Post('seed')
    async seed() {
            const file = await fs.readFile(process.cwd() + '/prisma/pokemons.json', 'utf8');
            const data = JSON.parse(file);
            console.log(data);
    }
}
