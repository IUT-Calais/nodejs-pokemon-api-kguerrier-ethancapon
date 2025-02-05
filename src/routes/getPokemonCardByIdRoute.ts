import { Router } from 'express';
import { getPokemonCardById } from '../controllers/pokemonCardController';

const router = Router();

router.get('/pokemons-cards/:pokemonCardId', getPokemonCardById);

export default router;