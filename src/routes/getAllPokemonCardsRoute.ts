import { Router } from 'express';
import { getAllPokemonCards } from '../controllers/pokemonCardController';

const router = Router();

router.get('/pokemons-cards', getAllPokemonCards);

export default router;