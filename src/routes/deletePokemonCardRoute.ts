import { Router } from 'express';
import { deletePokemonCard } from '../controllers/pokemonCardController';

const router = Router();

router.delete('/pokemons-cards/:pokemonCardId', deletePokemonCard);

export default router;