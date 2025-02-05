import { Router } from 'express';
import { updatePokemonCard } from '../controllers/pokemonCardController';

const router = Router();

router.patch('/pokemons-cards/:pokemonCardId', updatePokemonCard);

export default router;
