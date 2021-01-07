import React, { useState } from 'react'
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, I18nManager } from 'react-native'
import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors'
import HomeHeader from '../../../common/HomeHeader'
import * as Animatable from 'react-native-animatable';


const { width } = Dimensions.get('window')
function Settings({ navigation }) {

    const [Select, setSelect] = useState(false)

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bg }}>
            <HomeHeader navigation={navigation} label={i18n.t('settings')} onPress={() => navigation.navigate('MyProfile')} />
            <Animatable.View animation="lightSpeedIn" easing="ease-out" delay={500} style={{ justifyContent: 'center', alignItems: 'center' }}>

                <View style={styles.wrap}>

                    <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
                        <View style={styles.Container}>
                            <Text style={styles.text}>{i18n.t('myProfile')}</Text>
                            {
                                I18nManager.isRTL ?
                                    <Image source={require('../../../assets/Images/opengrayarrow.png')} style={styles.Img} resizeMode='contain' />
                                    :
                                    <Image source={require('../../../assets/Images/opengrayarrow_left.png')} style={styles.Img} resizeMode='contain' />

                            }
                        </View>
                    </TouchableOpacity>

                    <View style={styles.Line}></View>

                    <TouchableOpacity onPress={() => navigation.navigate('RestaurantInfo')}>
                        <View style={styles.Container}>
                            <Text style={styles.text}>{i18n.t('RestInfo')}</Text>
                            {
                                I18nManager.isRTL ?
                                    <Image source={require('../../../assets/Images/opengrayarrow.png')} style={styles.Img} resizeMode='contain' />
                                    :
                                    <Image source={require('../../../assets/Images/opengrayarrow_left.png')} style={styles.Img} resizeMode='contain' />

                            }
                        </View>
                    </TouchableOpacity>

                    <View style={styles.Line}></View>

                    <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
                        <View style={styles.Container}>
                            <Text style={styles.text}>{i18n.t('password')}</Text>
                            {
                                I18nManager.isRTL ?
                                    <Image source={require('../../../assets/Images/opengrayarrow.png')} style={styles.Img} resizeMode='contain' />
                                    :
                                    <Image source={require('../../../assets/Images/opengrayarrow_left.png')} style={styles.Img} resizeMode='contain' />

                            }
                        </View>
                    </TouchableOpacity>

                    <View style={styles.Line}></View>

                    <TouchableOpacity onPress={() => navigation.navigate('Lang')}>
                        <View style={styles.Container}>
                            <Text style={styles.text}>{i18n.t('language')}</Text>
                            {
                                I18nManager.isRTL ?
                                    <Image source={require('../../../assets/Images/opengrayarrow.png')} style={styles.Img} resizeMode='contain' />
                                    :
                                    <Image source={require('../../../assets/Images/opengrayarrow_left.png')} style={styles.Img} resizeMode='contain' />

                            }
                        </View>
                    </TouchableOpacity>

                    <View style={styles.Line}></View>


                </View>
                <View style={styles.Container}>
                    <Text style={styles.text}>{i18n.t('notifications')}</Text>
                    <TouchableOpacity onPress={() => setSelect(!Select)}>
                        {
                            Select ?
                                <Image source={require('../../../assets/Images/on_notifcatiom.png')} style={styles.BImg} resizeMode='contain' />
                                :
                                <Image source={require('../../../assets/Images/off_notifcatiom.png')} style={styles.BImg} resizeMode='contain' />

                        }
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}
const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'column',
        marginTop: 25,
        backgroundColor: '#F1F1F1',
    },
    Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        padding: 10,
        alignItems: 'center',
    },
    Img: {
        height: 25,
        width: 25,
    },
    BImg: {
        height: 50,
        width: 50,
    },
    Line: {
        width,
        height: 1,
        backgroundColor: Colors.fontBold,
        opacity: .2
    },
    text: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        color: Colors.fontNormal
    }
})
export default Settings
