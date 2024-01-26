-- AlterTable
CREATE SEQUENCE pokemon_id_seq;
ALTER TABLE "Pokemon" ALTER COLUMN "id" SET DEFAULT nextval('pokemon_id_seq');
ALTER SEQUENCE pokemon_id_seq OWNED BY "Pokemon"."id";
