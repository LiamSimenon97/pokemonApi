import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeamService {
    constructor(private prisma:PrismaService) {}

    async createTeam(name:string) {
        return this.prisma.team.create({
            data: {
                name: name
            }
        })
    }

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

    setPokemonToTeam(teamId:number, pokemonsIds:number[]) {
        return this.prisma.team.update({
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
            }
        })
    }
}