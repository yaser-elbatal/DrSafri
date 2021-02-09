import React from 'react'
import { View, Image, TouchableOpacity, StyleSheet, I18nManager, Platform } from 'react-native'
import { width, height } from '../consts/HeightWidth'

function BackBtn({ navigation }) {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/Images/bluBack.png')} style={[styles.BGImage, { transform: I18nManager.isRTL ? [{ rotateY: ' -180deg' }] : [{ rotateY: '0deg' }], }]} resizeMode='contain' />
            <TouchableOpacity style={styles.Btn} onPress={() => navigation.goBack()}>
                {
                    I18nManager.isRTL ?
                        <Image source={require('../assets/Images/left.png')} style={styles.arrow} resizeMode='contain' />
                        :
                        <Image source={require('../assets/Images/arrowwhite.png')} style={styles.arrow} resizeMode='contain' />


                }
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
        bottom: Platform.OS === 'ios' ? 45 : 25,
        left: 10,
        right: 0

    },
    BGImage: {
        width: width * .25,
        height: width * .5,
    },
    Btn: {
        position: 'absolute',
        marginTop: width * .25,
    },
    arrow: {
        width: width * .08,
        height: height * .05,
        marginHorizontal: 30
    }

})
export default BackBtn
