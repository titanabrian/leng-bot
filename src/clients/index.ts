import { Axios } from "axios";

export class ClientConfig{
  public key: string;
  public base_url: string;
  constructor(base_url?:string, key?:string){
    this.key=key;
    this.base_url=base_url;
  }
}

export default class BaseClient{
  private config: ClientConfig;
  private client: Axios;

  constructor(cfg: ClientConfig){
    this.config = cfg;

    const axiosConfig = {
      baseURL: this.config.base_url,
    }

    this.client = new Axios(axiosConfig);
  }

  protected async get(endpoint:string):Promise<any>{
    const resp = await this.client.get(`${this.config.base_url}${endpoint}`)
    const respJSON = JSON.parse(resp.data);
    return respJSON.data;
  }
}