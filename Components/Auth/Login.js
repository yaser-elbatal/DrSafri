import React, { useState, useContext, useEffect, useRef } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, I18nManager, AsyncStorage, Alert, Platform, KeyboardAvoidingView } from 'react-native'
import Constants from 'expo-constants';

import { SText } from '../../common/SText';
import BackBtn from '../../common/BackBtn'
import { InputIcon } from '../../common/InputText';
import Colors from '../../consts/Colors';
import BTN from '../../common/BTN';
import { Toaster } from '../../common/Toaster';
import * as Notifications from 'expo-notifications';
import * as Animatable from 'react-native-animatable';

import {
    validatePhone,
    validatePassword,
} from "../../common/Validation";
import i18n from '../../locale/i18n'
import { useSelector, useDispatch } from 'react-redux';
import { SignIn } from '../../store/action/AuthAction';

import * as Permissions from 'expo-permissions';
// import { Notifications } from 'expo'
import Container from '../../common/Container';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

function Login({ navigation }) {

    const lang = useSelector(state => state.lang.language);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, Setisloading] = useState(false);
    const [userId, setUserId] = useState(null);

    const [spinner, setSpinner] = useState(true);

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


    const _validate = () => {
        let phoneErr = validatePhone(phone);
        let passwordErr = validatePassword(password);
        return phoneErr || passwordErr;
    };

    const SubmitLoginHandler = () => {
        const isVal = _validate();

        if (!isVal) {
            setSpinner(true)

            dispatch(SignIn(phone, password, expoPushToken, lang, navigation)).then(() => setSpinner(false)).catch(e => {
                setSpinner(false);
                alert(e);
            })
        }
        else {
            setSpinner(false)

            Toaster(_validate());

        }

    }
    console.log(expoPushToken);

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        });
        registerForPushNotificationsAsync().then(token => AsyncStorage.setItem('deviceID', token));

        setSpinner(false)

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {

                Alert.alert(
                    //title
                    'Hello',
                    //body
                    'Failed to get push token for push notification!',
                    [
                        // {
                        //     text: 'Yes',
                        //     onPress: () => console.log('Yes Pressed')
                        // },
                        {
                            text: 'ok',
                            onPress: () => console.log('No Pressed'), style: 'cancel'
                        },
                    ],
                    { cancelable: false },
                    //clicking out side of alert will not cancel
                );

                // alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
            Alert.alert(
                //title
                'Hello',
                //body
                'Must use physical device for Push Notifications',
                [
                    // {
                    //     text: 'Yes',
                    //     onPress: () => console.log('Yes Pressed')
                    // },
                    {
                        text: 'ok',
                        onPress: () => console.log('No Pressed'), style: 'cancel'
                    },
                ],
                { cancelable: false },
                //clicking out side of alert will not cancel
            );


            // alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
        AsyncStorage.setItem('deviceID', token);

        return token;
    }



    // const getDeviceId = async () => {
    //     const { status: existingStatus } = await Permissions.getAsync(
    //         Permissions.NOTIFICATIONS
    //     );

    //     let finalStatus = existingStatus;

    //     if (existingStatus !== 'granted') {
    //         const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    //         finalStatus = status;
    //     }

    //     if (finalStatus !== 'granted') {
    //         return;
    //     }

    //     const deviceId = await Notifications.getExpoPushTokenAsync();

    //     setDeviceId(deviceId);
    //     setUserId(null);

    //     AsyncStorage.setItem('deviceID', deviceId);
    // };
    // useEffect(() => {
    //     getDeviceId()
    //     setSpinner(false)
    // }, []);
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

                <BackBtn navigation={navigation} />
                <View style={{ flexDirection: 'column', marginHorizontal: 20, alignSelf: 'flex-start' }}>
                    <Text animation='slideInLeft' delay={500} style={styles.TextLogin}>{i18n.t('login')}</Text>
                    <Text animation='slideInRight' style={styles.UText}>{i18n.t('loginInf')}</Text>
                </View>
                <Container loading={spinner}>

                    <View style={{ overflow: 'hidden' }}>
                        <Animatable.View animation="zoomIn" easing="ease-out" delay={500}>
                            <Image source={require('../../assets/Images/Login.png')} style={styles.IMG} resizeMode='contain' />
                        </Animatable.View>
                    </View>
                    <InputIcon
                        label={i18n.t('phone')}
                        placeholder={i18n.t('phone')}
                        onChangeText={(e) => setPhone(e)}
                        value={phone}
                        styleCont={{ marginTop: 20 }}
                        keyboardType='numeric' />

                    <InputIcon
                        label={i18n.t('password')}
                        placeholder={i18n.t('password')}
                        onChangeText={(e) => setPassword(e)}
                        value={password}
                        secureTextEntry
                        styleCont={{ marginTop: 0 }}
                    />

                    <SText title={i18n.t('forgetPassword')} onPress={() => navigation.navigate('PhoneCheck')} style={styles.FPass} />


                    <BTN title={i18n.t('entry')} onPress={SubmitLoginHandler} ContainerStyle={styles.LoginBtn} />

                    <SText title={i18n.t('createAcc')} onPress={() => navigation.navigate('Fregister')} style={{ color: Colors.sky, fontSize: 15, marginVertical: 30, marginTop: 10 }} />
                </Container>
            </ScrollView>
        </KeyboardAvoidingView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bg,
    },
    TextLogin: {
        fontFamily: 'flatMedium',
        fontSize: 18,
        color: Colors.fontBold,
        alignSelf: 'flex-start'

    },
    UText: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        marginVertical: 10,
        color: Colors.fontNormal,
        alignSelf: 'flex-start'

    },
    IMG: {
        width: 240,
        height: 260,
        alignSelf: 'center'
    },

    FPass: {
        alignSelf: 'flex-start',
        marginHorizontal: 20,
        fontSize: 14
    },
    LoginBtn: {
        borderRadius: 5,

    }

})
export default Login
