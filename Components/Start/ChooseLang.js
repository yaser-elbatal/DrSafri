import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import i18n from '../../locale/i18n'
import Colors from '../../consts/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '../../store/action/LangAction';
import * as Animatable from 'react-native-animatable';

function ChooseLang({ navigation }) {

    const lang = useSelector(state => state.lang.language);
    const dispatch = useDispatch();

    const changeLang = async (lang, direction) => {
        await dispatch(changeLanguage(lang, direction,));

    };

    useEffect(() => {

        AsyncStorage.getItem("lang").then((lang) => {
            if (lang) {
                navigation.navigate("Home");
            }
        })

    }, [])

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: Colors.bg }}>
            <Animatable.View animation="fadeInUpBig" easing="ease-out" direction="alternate" delay={500} style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }} >
                <Image source={require('../../assets/Images/logo_sofri.png')} style={{ height: 200, width: 400 }} resizeMode='contain' />
                <Text style={{ fontFamily: 'flatMedium', fontSize: 20, }}>{i18n.t('chooseLange')}</Text>

                <TouchableOpacity onPress={() => { changeLang("ar", "RTL") }} style={{ borderWidth: 1, borderColor: lang == 'ar' ? Colors.sky : '#F7F7F7', backgroundColor: '#F7F7F7', width: 200, height: 150, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginTop: 10, flexDirection: 'column' }}>
                    <Image source={require('../../assets/Images/saudi_arabia.png')} style={{ height: 100, width: 100 }} resizeMode='contain' />
                    <Text style={{ fontFamily: 'flatMedium', }}>{i18n.t('Arabic')}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { changeLang("en", "LTR") }} style={{ borderWidth: 1, borderColor: lang == 'en' ? Colors.sky : '#F7F7F7', backgroundColor: '#F7F7F7', width: 200, height: 150, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginTop: 20, flexDirection: 'column' }}>
                    <Image source={require('../../assets/Images/english_language.png')} style={{ height: 100, width: 100 }} resizeMode='contain' />
                    <Text style={{ fontFamily: 'flatMedium', }}>{i18n.t('English')}</Text>
                </TouchableOpacity>

            </Animatable.View>
        </View>

    )
}

export default ChooseLang
