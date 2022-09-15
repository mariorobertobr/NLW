import express, { json } from 'express';
const app = express();
app.use(json());
app.get('/', (req, res) => {
    res.json([
        { id: 1, name: 'Anuncio 1' },
        { id: 2, name: 'Anuncio 2' },
        { id: 3, name: 'Anuncio 3' },
    ]);
});
app.listen(3000);
