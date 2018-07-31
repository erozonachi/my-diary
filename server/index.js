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

routes(app);
app.listen(port, () => {
  console.log(`Live on ${port}`);
});

export default app; // for testing
