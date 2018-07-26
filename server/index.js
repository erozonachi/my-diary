/**
* @author Eneh, James Erozonachi
*
* @description entry-point (Server) of MyDiary Applicaction
*
* */
import express from 'express';
import bodyParser from 'body-parser';
import validate from 'express-validation';
import routes from './routes/routes';

const app = express();

const port = process.env.PORT || 8000;

app.use(bodyParser.json({ extended: true }));

routes(app, validate);
app.use((err, req, res, next) => {
  if (err instanceof validate.ValidationError) {
    res.status(err.status).json(err);
  } else {
    res.status(500)
      .json({
        status: err.status,
        message: err.message,
      });
  }
});
app.listen(port, () => {
  console.log(`We are live on ${port}`);
});

export default app; // for testing
