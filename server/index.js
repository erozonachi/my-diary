/**
* @author Eneh, James Erozonachi
*
* @description entry-point (Server) of MyDiary Applicaction
*
* */
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes';
import diary from './models/diary';

const app = express();

const port = process.env.PORT || 8000;

app.use(bodyParser.json({ extended: true }));

routes(app, diary);
app.listen(port, () => {
  console.log(`We are live on ${port}`);
});
