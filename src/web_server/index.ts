import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response, Router } from 'express';
import Bot from '../libs/bot';
import registerRoutes from './routers';

const app: Express = express();
const router: Router = express.Router();
dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;

const bot = new Bot(BOT_TOKEN);
bot.auth();
app.use(express.static('./src/public'));
app.use(bodyParser());
app.use(cors());

registerRoutes(router);
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'healty',
    message: 'Don\'t worry, im healthy',
  });
});

app.use('/api', router);

app.listen(3000, () => {
  console.log(`listening on 3000`);
});
