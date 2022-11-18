import { RestService } from '../rest/restService';

class QuitService {
  public static async sendQuitSignal(): Promise<any> {
    try {
      return await RestService.post<any>({
        url: `destroy`
      });
    } catch (err) {
      console.warn(err);
      throw err;
    }
  }
}

export default QuitService;
