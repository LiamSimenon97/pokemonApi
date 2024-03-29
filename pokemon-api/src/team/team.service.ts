import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeamService {
    constructor(private prisma:PrismaService) {}

    //Create a team
    //@param name The name of the team
    //@returns The created team
    async createTeam(name:string) {
        return this.prisma.team.create({
            data: {
                name: name
            }
        })
    }
    //Get all teams
    //@returns All teams
    async getAllTeams() {
        return this.prisma.team.findMany({
            include: {
                pokemons: {
                    include: {
                        types: {
                            include: {
                                type: true
                            }
                        },
                        sprites: true
                    }
                }
            }
        })
    }
    //Get a team by id
    //@param id The id of the team
    //@returns The team with the given id
    //@throws NotFoundException if the team doesn't exist
    async getTeamById(id:number) {
        const team = await this.prisma.team.findUnique({
            where: {
                id: id
            },
            include: {
                pokemons: {
                    include: {
                        types: {
                            include: {
                                type: true
                            }
                        },
                        sprites: true
                    }
                }
            }
        })
        if(!team) throw new NotFoundException(`Team with id ${id} not found`);
        return team;
    }
    //Set pokemons to a team
    //@param teamId The id of the team
    //@param pokemonsIds The ids of the pokemons to add to the team
    //@returns The updated team
    //@throws NotFoundException if the team doesn't exist
    //@throws ForbiddenException if the team already has 6 pokemons
    async setPokemonToTeam(teamId:number, pokemonsIds:number[]) {
        const pokemonsInTeam = await this.getTeamById(teamId).then(team => team.pokemons);
        if(!pokemonsInTeam) throw new NotFoundException(`Team with id ${teamId} not found`);
        if(pokemonsInTeam.length + pokemonsIds.length > 6) throw new ForbiddenException("A team can't have more than 6 pokemons");

        const team = await this.prisma.team.update({
            where: {
                id: teamId
            },
            data: {
                pokemons: {
                    connect: pokemonsIds.map(id => {
                        return {
                            id: id
                        }
                    })
                }
            },
            include: {
                pokemons: {
                    include: {
                        types: {
                            include: {
                                type: true
                            }
                        },
                        sprites: true
                    }
                }
            }
        })
        if(!team) throw new NotFoundException(`Team with id ${teamId} not found`);
        return team;
    }
    //Delete a team
    //@param id The id of the team
    //@returns The deleted team
    //@throws NotFoundException if the team doesn't exist
    async deleteTeam(id:number) {
        const team = await this.prisma.team.delete({
            where: {
                id: id
            }
        })
        if(!team) throw new NotFoundException(`Team with id ${id} not found`);
        return team;
    }
    //Remove pokemons from a team
    //@param teamId The id of the team
    //@param pokemonsIds The ids of the pokemons to remove from the team
    //@returns The updated team
    //@throws NotFoundException if the team doesn't exist
    //@throws NotFoundException if the pokemon(s) are not in the team
    async removePokemonFromTeam(teamId:number, pokemonsIds:number[]) {
        //Check if the pokemons are in the team
        const pokemonsInTeam = await this.getTeamById(teamId).then(team => team.pokemons);
        if(!pokemonsInTeam) throw new NotFoundException(`Team with id ${teamId} not found`);
        const pokemonsIdsInTeam = pokemonsInTeam.map(pokemon => pokemon.id);
        const pokemonsIdsNotInTeam = pokemonsIds.filter(id => !pokemonsIdsInTeam.includes(id));
        if(pokemonsIdsNotInTeam.length > 0) throw new NotFoundException(`The pokemon(s) with id(s) ${pokemonsIdsNotInTeam} are not in the team`);
        const team = await this.prisma.team.update({
            where: {
                id: teamId
            },
            data: {
                pokemons: {
                    disconnect: pokemonsIds.map(id => {
                        return {
                            id: id
                        }
                    })
                }
            },
            include: {
                pokemons: {
                    include: {
                        types: {
                            include: {
                                type: true
                            }
                        },
                        sprites: true
                    }
                }
            }
        })
        if(!team) throw new NotFoundException(`Team with id ${teamId} not found`);
        return team;
    }
    //Remove all pokemons from a team
    //@param teamId The id of the team
    //@returns The updated team
    //@throws NotFoundException if the team doesn't exist
    async removeAllPokemonFromTeam(teamId:number) {
        const team = await this.prisma.team.update({
            where: {
                id: teamId
            },
            data: {
                pokemons: {
                    set: []
                }
            }
        })
        if(!team) throw new NotFoundException(`Team with id ${teamId} not found`);
        return team;
    }
}