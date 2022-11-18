import { RestService } from '../rest/restService';
import { IDeploymentRequest } from './deploymentService.types';

class DeploymentService {
  public static async startDeployment(data: IDeploymentRequest): Promise<any> {
    try {
      return await RestService.post<any>({
        url: `deploy`,
        data
      });
    } catch (err) {
      console.warn(err);
      throw err;
    }
  }
}

export default DeploymentService;
