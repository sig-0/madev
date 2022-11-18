import { NodeRestService } from '../nodeRest/restService';

class NodeService {
  public static async getBalance(address: string): Promise<any> {
    try {
      return await NodeRestService.post<any>({
        data: {
          jsonrpc: '2.0',
          method: 'eth_getBalance',
          params: [address, 'latest'],
          id: 1
        }
      });
    } catch (err) {
      console.warn(err);
      throw err;
    }
  }
}

export default NodeService;
