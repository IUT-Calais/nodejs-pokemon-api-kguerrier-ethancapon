import express from 'express';
import getAllPokemonCardsRoute from './routes/getAllPokemonCardsRoute';
import getPokemonCardByIdRoute from './routes/getPokemonCardByIdRoute';
import createPokemonCardRoute from './routes/createPokemonCardRoute';
import updatePokemonCardRoute from './routes/updatePokemonCardRoute';
import deletePokemonCardRoute from './routes/deletePokemonCardRoute';
import createUserRoute from './routes/createUserRoute';
import loginUserRoute from './routes/loginUserRoute';

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(getAllPokemonCardsRoute);
app.use(getPokemonCardByIdRoute);
app.use(createPokemonCardRoute);
app.use(updatePokemonCardRoute);
app.use(deletePokemonCardRoute);
app.use(createUserRoute);
app.use(loginUserRoute);

export const server = app.listen(port);

export function stopServer() {
  server.close();
}