import { Router } from 'express';
import { createPokemonCard } from '../controllers/pokemonCardController';

const router = Router();

router.post('/pokemons-cards', createPokemonCard);

export default router;
