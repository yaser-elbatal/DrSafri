
import consts from '../../consts';
import axios from 'axios';
import { Toast } from "native-base";

export const profile_data = 'profile_data'
export const Update_Profile = 'Update_Profile'

export const GetProfile = (token, lang) => {
    return async dispatch => {
        await axios({
            url: consts.url + 'profile',
            method: 'GET',
            params: { lang },
            headers: { Authorization: 'Bearer ' + token, },

        }).then(response => {
            if (response.data.success) {
                dispatch({ type: profile_data, data: response.data })
            }


        })
    }
}


export const UpdateProfile = (token, lang, name, phone, email, avatar, navigation) => {
    return async dispatch => {
        await axios({
            url: consts.url + 'edit-profile',
            method: 'POST',
            data: { name, phone, email, avatar },
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang, }

        }).then(res => {
            if (res.data.success) {
                navigation.navigate('MyProfile')
                dispatch({ type: Update_Profile, data: res.data })

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
        }
        )


    }
}

export const EditPasswordSettingsProfile = (token, old_password, current_password, lang, navigation) => {
    return async dispatch => {
        await axios({
            url: consts.url + 'edit-password',
            method: 'POST',
            data: { old_password, current_password },
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang, }

        }).then(res => {
            if (res.data.success) {
                navigation.navigate('Settings')

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
        }
        )


    }
}