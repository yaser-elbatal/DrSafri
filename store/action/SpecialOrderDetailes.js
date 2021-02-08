import consts from "../../consts";
import axios from 'axios';
import { Toast } from "native-base";
import i18n from '../../locale/i18n'

export const Get_Special_Orders = 'Get_Special_Orders';
export const Get_Special_Orders_det = 'Get_Special_Orders_det'


export const GetSpecialOrders = (token, status, lang, text) => {
    return async (dispatch) => {
        await axios({
            method: 'POST',
            url: consts.url + 'my-special-orders',
            data: { status, text },
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }

        }).then(res => {
            dispatch({ type: Get_Special_Orders, data: res.data })
        })
    }
}


export const GetSpecialOrdersDetailes = (token, id, lang,) => {
    return async (dispatch) => {
        await axios({
            method: 'POST',
            url: consts.url + 'special-order-details',
            data: { id, },
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }

        }).then(res => {
            dispatch({ type: Get_Special_Orders_det, data: res.data })
        })
    }
}


export const AddSpecialPrice = (token, id, price, lang,) => {
    return async (dispatch) => {
        await axios({
            method: 'POST',
            url: consts.url + 'add-special-price',
            data: { id, price },
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }

        }).then(res => {

            Toast.show({
                text: res.data.message,
                type: res.data.success ? "success" : "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    textAlign: 'center'
                }
            });
        })
    }
}