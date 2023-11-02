import axios from 'axios';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';

const initPayment = async (payload: any) => {
  try {
    const data = {
      store_id: config.ssl.store_id,
      store_passwd: config.ssl.store_passwd,
      total_amount:payload.total_amount,
      currency: 'BDT',
      tran_id: payload.tran_id, // use unique tran_id for each api call
      success_url: 'https://ordain-interior.vercel.app/payment/success',
      fail_url: 'https://ordain-interior.vercel.app/payment/fail',
      cancel_url: 'https://ordain-interior.vercel.app/payment/cancel',
      ipn_url: 'https://ordain-interior.vercel.app/payment/ipn',
      shipping_method: payload.shipping_method,
      product_name: payload.product_name,
      product_category: payload.product_category,
      cus_name: payload.cus_name,
      cus_email: payload.cus_email,
      cus_add: payload.cus_add,
    //   cus_city: payload.cus_city,
      cus_country: payload.cus_country,
      cus_phone: payload.cus_phone,
      ship_add: payload.ship_add,
    //   ship_city: payload.ship_city,
      ship_country: payload.ship_country,
    };
    // console.log(data);
    const response = await axios({
      method: 'post',
      url: config.ssl.sslPaymentUrl,
      data: data,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    console.log('🚀~ response:', response);

    return response.data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Payment Error');
  }
};

const validate = async(data:any):Promise<any>=>{
    try {
        const response = await axios({
            method:"GET",
            url:`${config.ssl.sslPaymentUrl}?val_id=${data.val_id}&store_id=${config.ssl.store_id}&store_passwd=${config.ssl.store_passwd}&formate=json`
        })
        console.log(response);
        return response
        
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST,"Payment Error")
        
    }
}

export const sslService = { initPayment ,validate};
