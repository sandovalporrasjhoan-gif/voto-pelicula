
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

app.get('/result', (req, res) => {

    console.log("votos", req.query);
const peliculasOrdenadas = [...peliculas].sort((a, b) => {
    return b.votes - a.votes;
});
    res.json(peliculasOrdenadas);
});

app.post('/agree', (req, res) => {
    console.log("lo agregamos", req.body);
    const newMovie ={
        id: peliculas.length + 1,
        title: req.body.title,
        description: req.body.description,
        votes: 0
    }
    peliculas.push(newMovie);
    res.json(peliculas);
});

app.patch('/modify/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    const { title, description } = req.body;
    const movie = peliculas.find(p => p.id === movieId);
    console.log("modificacion xd", req.body);
    if (movie) {
        movie.title = title;
        movie.description = description;
        res.json(movie);
    } else {
        console.log("Película no esta");
        res.status(404).json({ error: "Película no encontrada" });
    }
});

app.delete('/delete/:id', (req, res) => {
    console.log("eliminamos porque tiene 0 votos", req.params);
    const movieId = parseInt(req.params.id);
    const index = peliculas.findIndex(p => p.id === movieId);
    if (index !== -1) {
        peliculas.splice(index, 1);
        res.json({ message: "Película eliminada correctamente" });
    } else {
        res.status(404).json({ error: "Película no encontrada" });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
