import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ImageBackground, I18nManager, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import Colors from '../../consts/Colors'
import i18n from '../../locale/i18n'
import { InputIcon } from '../../common/InputText'
import { validateUserName, validateEmail, ValdiateCITyId, validatePhone } from '../../common/Validation'
import { Dropdown } from 'react-native-material-dropdown';
import BTN from '../../common/BTN'
import { width } from '../../consts/HeightWidth'
import { useSelector, useDispatch } from 'react-redux'
import { getCititis } from '../../store/action/CitiesAction'
import { UpdateProfile, GetProfile } from '../../store/action/ProfileAction'
import { Toaster } from '../../common/Toaster'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { ProductDetailes } from '../../store/action/ProductAction'
import Container from '../../common/Container'

function EditProfile({ navigation }) {
    const user = useSelector(state => state.auth.user.data)

    const [nameEN, setNameEN] = useState(user.name)
    const [email, setemail] = useState(user.email)
    const [city, setCity] = useState(user.address)
    const [phone, setPhone] = useState(user.phone)
    const [base64, setBase64] = useState(null);
    const [userImage, setUserImage] = useState(user.avatar);

    const [spinner, setSpinner] = useState(true);

    const cities = useSelector(state => state.cities.cities)
    const lang = useSelector(state => state.lang.language);
    const token = useSelector(state => state.auth.user.data.token);
    const myProf = useSelector(state => state.profile.user.data);


    let image = userImage;


    let cityName = cities.map(city => ({ label: city.name, value: city.id }));
    // let CityID = cities.map(city => ({ label: city.name, }));

    const dispatch = useDispatch();

    const askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };

    const _pickImage = async () => {

        askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            aspect: [3, 4],
            base64: true
        });

        if (!result.cancelled) {
            setUserImage(result.uri);
            setBase64(result.base64);
        }
    };

    const _validate = () => {
        let nameErr = validateUserName(nameEN)
        let CityID = ValdiateCITyId(city)
        let emailErr = validateEmail(email)
        let PhoenErr = validatePhone(phone);


        return nameErr || CityID || emailErr || PhoenErr
    };



    function renderLoader() {
        if (spinner) {
            return (
                <View style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    backgroundColor: '#23232387',
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                }}>
                    <ActivityIndicator size="large" color={Colors.sky} style={{ alignSelf: 'center', }} />
                </View>
            );
        }
    }





    const UpdateData = () => {
        let val = _validate();

        if (!val) {
            setSpinner(true)
            dispatch(UpdateProfile(token, lang, nameEN, phone, email, base64, navigation)).then(() => setSpinner(false))

        }
        else {
            setSpinner(false)
            Toaster(_validate());

        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(getCititis(lang));
            dispatch(GetProfile(token, lang)).then(() => setSpinner(false))
        })

        return unsubscribe;

    }, [navigation])


    return (
        <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "padding" : "height"} style={{ backgroundColor: 'white', flex: 1 }}>


            <ScrollView style={{ flex: 1 }}>
                {renderLoader()}
                <Image source={image != null ? { uri: image } : { uri: userImage }} style={styles.ImgBackGround} />
                <TouchableOpacity style={{ position: 'absolute', alignSelf: 'center', top: 150 }} onPress={_pickImage}>
                    <Image source={require('../../assets/Images/add_photo_white.png')} style={{ width: 80, height: 80, }} />
                </TouchableOpacity>



                <ImageBackground source={require('../../assets/Images/bluBack.png')} style={{ height: 120, width: 120, alignItems: 'center', justifyContent: 'center', position: 'absolute', marginLeft: -20 }} resizeMode='contain'>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        {
                            I18nManager.isRTL ?
                                <Image source={require('../../assets/Images/arrowwhite.png')} style={{ height: 25, width: 25, marginTop: 45 }} resizeMode='contain' />
                                :
                                <Image source={require('../../assets/Images/left.png')} style={{ height: 25, width: 25, marginTop: 45 }} resizeMode='contain' />

                        }
                    </TouchableOpacity>
                </ImageBackground>

                <View style={styles.ScrolContainer}>

                    <Text style={styles.MainText}>{i18n.t('myProfile')}</Text>


                    <View style={{ margin: 20, marginTop: 0, }}>

                        <InputIcon
                            label={i18n.t('usernamen')}
                            placeholder={i18n.t('usernamen')}
                            onChangeText={(e) => setNameEN(e)}
                            value={nameEN}
                            styleCont={{ marginTop: 0 }}

                        />


                        <InputIcon
                            label={i18n.t('email')}
                            placeholder={i18n.t('email')}
                            onChangeText={(e) => setemail(e)}
                            value={email}

                            keyboardType='email-address'
                            styleCont={{ marginTop: 0 }}
                        />

                        <InputIcon
                            label={i18n.t('phone')}
                            placeholder={i18n.t('phone')}
                            onChangeText={(e) => setPhone(e)}
                            value={phone}

                            keyboardType='numeric'
                            styleCont={{ marginTop: 0 }}
                        />

                        {/* <View style={{ borderWidth: .6, borderRadius: 5, backgroundColor: Colors.bg, alignItems: 'center', justifyContent: 'center', height: width * .14, borderColor: Colors.InputColor, marginHorizontal: '5%', }}>
                            <Dropdown
                                placeholder={i18n.t('city')}
                                data={cityName}
                                fontSize={12}
                                itemTextStyle={{ fontFamily: 'flatMedium' }}
                                lineWidth={0}
                                containerStyle={{ width: '90%', paddingHorizontal: 5, bottom: 10 }}
                                animationDuration={0}
                                onChangeText={val => setCity(val)}

                                value={city}
                            />
                        </View> */}

                        <BTN title={i18n.t('save')} ContainerStyle={styles.LoginBtn} onPress={UpdateData} />



                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    )
}
const styles = StyleSheet.create({
    MainText: {
        fontFamily: 'flatMedium',
        fontSize: 18,
        margin: 20,
        paddingStart: 15
    },
    user: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        color: Colors.fontNormal
    },
    EditImg: {
        width: 20,
        height: 20
    },
    Wrab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    ImgBackGround: {
        width: '100%',
        height: 400,
        opacity: .7
    },

    ScrolContainer: {
        width: '100%',
        backgroundColor: Colors.bg,
        bottom: 0, height: 350,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    DrbContain: {
        borderColor: '#E0E0E0',
        borderWidth: 1,
        width: '90%',
        borderRadius: 5,
        marginHorizontal: "5%"
    },
    LoginBtn: {
        borderRadius: 5,
        marginHorizontal: 20,
        width: '90%',
        marginTop: 10

    }
})
export default EditProfile
