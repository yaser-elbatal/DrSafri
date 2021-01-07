import consts from "../../consts";
import axios from 'axios';
import { Toast } from "native-base";

export const Get_banners = 'Get_banners';
export const Add_banners = 'Add_banners'
export const Delete_Banners = 'Delete_Banners';



export const GetBanners = (token, lang) => {
    return async (dispatch) => {
        await axios({
            method: 'GET',
            url: consts.url + 'provider-banner',
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }

        }).then(res => dispatch({ type: Get_banners, data: res.data }))


    }
}


export const AddBanners = (token, image, lang) => {
    return async (dispatch) => {
        await axios({
            method: 'POST',
            url: consts.url + 'add-banner',
            data: { image },
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }

        }).then(res => {
            if (res.data.success) {
                dispatch({ type: Add_banners, data: res.data })

            }
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


export const DeleteBanners = (token, id, lang) => {
    return async (dispatch) => {
        await axios({
            method: 'DELETE',
            url: `${consts.url}delete-banner?id=${id}`,
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }

        }).then(res => {

            if (res.data.success) {
                dispatch({ type: Delete_Banners, data: res.data })

            }
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