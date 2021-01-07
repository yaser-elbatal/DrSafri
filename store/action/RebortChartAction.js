
import consts from '../../consts';
import axios from 'axios';
import { Toast } from "native-base";

export const Get_Chart_data = 'Get_Chart_data'
export const Create_reborts = 'Create_reborts'

export const GetRebortsCharts = (token, lang) => {
    return async dispatch => {
        await axios({
            url: consts.url + 'quick-reports',
            method: 'GET',
            params: { lang },
            headers: { Authorization: 'Bearer ' + token, },

        }).then(response => {
            dispatch({ type: Get_Chart_data, data: response.data.data })
        })
    }
}

export const CreateRebortChart = (token, lang, navigation) => {
    return async dispatch => {
        await axios({
            url: consts.url + 'get-report',
            method: 'POST',
            params: { lang },
            headers: { Authorization: 'Bearer ' + token, },

        }).then(response => {
            if (response.data.success) {
                // dispatch({ type: Create_reborts, data: response.data.data })
                navigation.navigate('HomePage')

                Toast.show({
                    text: response.data.message,
                    type: response.data.success ? "success" : "danger",
                    duration: 9000,
                    textStyle: {
                        color: "white",
                        textAlign: 'center'
                    }
                });
            }



        })
    }
}