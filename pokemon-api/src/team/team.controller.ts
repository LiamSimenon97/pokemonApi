import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { TeamService } from './team.service';

@Controller('api/v1')
export class TeamController {
    constructor(private teamService:TeamService) {}

    @Post("team")
    async createTeam(@Body('name') name:string) {
        return this.teamService.createTeam(name);
    }

    @Get("teams")
    async getAllTeams() {
        return this.teamService.getAllTeams();
    }

    @Get("team/:id")
    async getTeamById(@Param('id',new ParseIntPipe()) id:number) {
        console.log(id);
        return this.teamService.getTeamById(id);
    }

    @Post("team/pokemon")
    async setPokemonToTeam(@Body('id') teamId:number, @Body('pokemonsIds') pokemonId:number[]) {
        return this.teamService.setPokemonToTeam(teamId, pokemonId);
    }
}
