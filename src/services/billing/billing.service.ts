import { instance } from '@/api/axios';
import { InitPaymentRequest, InitPaymentParams } from './billing.types';

class BillingService {
  private _BASE_URL = '/billing';

  async initPayment(data: InitPaymentParams) {
    const response = await instance.post<InitPaymentRequest>(`${this._BASE_URL}/topup`, data);
    return response.data
  }
}

const billingService = new BillingService();

export default billingService;