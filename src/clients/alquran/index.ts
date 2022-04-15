import BaseClient, { ClientConfig } from '../index';
export default class AlquranClient extends BaseClient{
  constructor(cfg: ClientConfig) {
    super(cfg);
  }
  public async getAyat(num:number, lang:string): Promise<any>{
    let ln;
    switch(lang){
      case 'english':
        ln='en.asad';
        break;
      case 'arabic':
        ln='ar.alafasy';
        break;
      default:
        ln='ar.alafasy';
        break;
    }
    return super.get(`/v1/ayah/${num}/${ln}`);
  }
}