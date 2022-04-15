import AlquranClient from '../../../clients/alquran';
import Bot from '../../../libs/bot';

export default class AyatService {
  private bot;
  private alquranClient;

  constructor(bot: Bot, alquranClient: AlquranClient) {
    this.bot = bot;
    this.alquranClient = alquranClient;
  }

  public async shareAyat(): Promise<any> {
    const ayatNum = this.getRandomAyat();
    const ayatEng = await this.alquranClient.getAyat(ayatNum, 'english');
    const ayatAr = await this.alquranClient.getAyat(ayatNum, 'arabic');
    return {
      ayat_eng: ayatEng,
      ayat_ar: ayatAr,
    };
  }

  private getRandomAyat(): number {
    return Math.floor(Math.random() * 6236) +1;
  }
}
