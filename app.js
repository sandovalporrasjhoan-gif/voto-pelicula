
const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;


const peliculas = [
{ "id": 1, "title": "Inception", "description": "Una película de ciencia ficción dirigida por Christopher Nolan", "votes": 0 },
{ "id": 2, "title": "Titanic", "description": "Historia romántica dirigida por James Cameron", "votes": 0 },
{ "id": 3, "title": "The Matrix", "description": "Película de acción y ciencia ficción dirigida por los hermanos Wachowski", "votes": 0 }
]

app.get ('/movies', (req, res)=>{
    console.log( `query:`, req.query);
    res.json(peliculas);
} );

app.post('/vote/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    console.log( `query:`, req.body);
    const movie = peliculas.find(p => p.id === movieId);
    if (movie) {
        movie.votes += 1;
        console.log(`Voto registrado correctamente para la película ${movieId}`);
        res.json({ message: `Voto registrado correctamente ${movieId}` });
    } else {

        console.log("Película no encontrada");
        res.status(404).json({ error: "Película no encontrada" });
    }
});

app.get('/movies/:id', (req, res) => {
    const movieId = Number(req.params.id);
    console.log(`query:`, req.params);
    const single = peliculas.find( p=> p.id == movieId);

    if(single){
         res.json(single)
    }
    else{
        console.log("no esta");
        res.status(404).json({ error: "Película no encontrada" });
    }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
