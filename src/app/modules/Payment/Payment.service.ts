import { sslService } from '../SSL/ssl.service';

type TransactionData = {
  total_amount: number;
  tran_id: string;
  shipping_method: string;
  product_name: string;
  product_category: string;
  cus_name: string;
  cus_email: string;
  cus_add: string;
  cus_country: string;
  cus_phone: string;
  ship_add: string;
  ship_country: string;
};
const initPayment = async (data: TransactionData) => {
  const paymentSession = await sslService.initPayment({
    total_amount: data.total_amount,
    tran_id: data.tran_id,
    shipping_method: data.shipping_method,
    product_name: data.product_name,
    product_category: data.product_category,
    cus_name: data.cus_name,
    cus_email: data.cus_email,
    cus_add: data.cus_add,
    cus_country: data.cus_country,
    cus_phone: data.cus_phone,
    ship_add: data.ship_add,
    ship_country: data.ship_country,
  });

  return paymentSession;
};

export const PaymentService = { initPayment };
