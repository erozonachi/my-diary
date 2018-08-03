/**
* @author Eneh, James Erozonachi
*
* @description entry-point (Server) of MyDiary Applicaction
*
* */
import cron from 'node-cron';
import UserSettings from './helpers/UserSettings';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './routes/routes';

cron.schedule('0 11 * * *', () => {
  UserSettings.sendReminder();
}, true);

dotenv.config();
const app = express();

const port = process.env.PORT || 8000;

app.use(bodyParser.json({ extended: true }));
app.use((req, res, next) => { // https://enable-cors.org/server_expressjs.html
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, x-access-token, Content-Type, Accept");
  next();
});

routes(app);
app.listen(port, () => {
  console.log(`Live on ${port}`);
});

export default app; // for testing
