import { Request, Response } from 'express';
import { ClientConfig } from '../../clients';
import AlquranClient from '../../clients/alquran';
import Bot from '../../libs/bot';
import AyatService from '../services/ayat';

export default class AyatController {
  private bot: Bot;
  private ayatService: AyatService;
  constructor() {
    this.bot = new Bot(process.env.BOT_TOKEN);
    const clientCfg = new ClientConfig('http://api.alquran.cloud')
    const alquranClient = new AlquranClient(clientCfg);

    this.ayatService = new AyatService(this.bot, alquranClient);
  }

  public shareAyat(): any {
    return [
      async (req: Request, res: Response) => {
        const ayat = await this.ayatService.shareAyat();
        res.json(ayat);
      }
    ]
  }
}