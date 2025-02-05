import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllPokemonCards = async (_req: Request, res: Response) => {
  try {
    const pokemonCards = await prisma.pokemonCard.findMany();
    res.status(200).json(pokemonCards);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des cartes Pokémon' });
  }
};

export const getPokemonCardById = async (_req: Request, res: Response) => {
  try {
    const pokemonCard = await prisma.pokemonCard.findUnique({
      where: {
        id: parseInt(_req.params.pokemonCardId)
      }
    });

    if (!pokemonCard) {
     res.status(404).json({ error: 'Carte Pokémon non trouvée' });
    }

    res.status(200).send(pokemonCard);
  } catch (error) {
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération de la carte Pokémon" });
  }
};

export const createPokemonCard = async (req: Request, res: Response) => {
  const { name, typeId, pokedexId, lifePoints, size, weight, imageUrl } = req.body;
  try {
    const newPokemonCard = await prisma.pokemonCard.create({
      data: { name, typeId, pokedexId, lifePoints, size, weight, imageUrl },
    });
    res.status(201).json(newPokemonCard);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la création de la carte Pokémon' });
  }
};

export const updatePokemonCard = async (req: Request, res: Response) => {
  const { name, typeId, pokedexId, lifePoints, size, weight, imageUrl } = req.body;
  try {
    const updatedPokemonCard = await prisma.pokemonCard.update({
      where: { id: parseInt(req.params.pokemonCardId) },
      data: { name, typeId, pokedexId, lifePoints, size, weight, imageUrl },
    });
    res.status(200).json(updatedPokemonCard);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour de la carte Pokémon' });
  }
};

export const deletePokemonCard = async (req: Request, res: Response) => {
  const { pokemonCardId } = req.params;
  try {
    await prisma.pokemonCard.delete({ where: { id: Number(pokemonCardId) } });
    res.status(200).json({ message: 'Carte Pokémon supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression de la carte Pokémon' });
  }
};