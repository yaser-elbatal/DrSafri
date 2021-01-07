import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, I18nManager, Platform, AsyncStorage, ActivityIndicator } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Colors from '../../consts/Colors';
import i18n from '../../locale/i18n';
import I18n from "i18n-js";
import Icon from 'react-native-vector-icons/Octicons';

import { useSelector, useDispatch } from 'react-redux';
import { IntroService } from '../../store/action/IntroAction';
// import Container from '../../common/Container';
import * as Animatable from 'react-native-animatable';


const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')

const Slider = ({ navigation, route }) => {

    const Intro = useSelector(state => state.intro.intro)
    const lang = useSelector(state => state.lang.language);
    const [spinner, setSpinner] = useState(true);
    const dispatch = useDispatch()

    useEffect(() => {

        // AsyncStorage.getItem("Inro").then((itro) => {
        //     if (itro) {
        //         navigation.navigate("Login");
        //     }
        // })

        AsyncStorage.getItem("Inro", (err, res) => {
            if (res === "true") {
                navigation.navigate("Login");
            }
        });

        dispatch(IntroService(lang))



    }, []);

    const Begin = async () => {
        await AsyncStorage.setItem('Inro', 'true').then(() => navigation.navigate('Login'))

    }

    const slides = Intro.map(int => ({ key: int.image, title: int.title, text: int.details, image: { uri: int.image }, backgroundColor: 'red', }))

    const renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Icon
                    name="reply"
                    color="rgba(255, 255, 255, .9)"
                    size={24}

                />
            </View>
        );
    };



    const renderItem = ({ item }) => {

        return (
            <Animatable.View animation="zoomIn" easing="ease-out" delay={500} style={styles.slide}>
                <Image source={item.image} style={styles.ImgsSlide} />
                <View style={styles.container}>
                    <Text animation="slideInDown" iterationCount={5} direction="alternate" style={styles.title}>{item.title}</Text>
                    <Text animation="slideInDown" iterationCount={5} direction="alternate" style={styles.text}>{item.text}</Text>

                </View>

            </Animatable.View>


        );
    }
    const renderDoneButton = () => {
        return (
            <Animatable.View animation="fadeInUp" easing="ease-out" delay={500}>
                <TouchableOpacity style={styles.Button} onPress={Begin}>
                    <Text style={styles.textBtn}>
                        {i18n.t('start')}
                    </Text>
                </TouchableOpacity>
            </Animatable.View>


        );
    };
    return (
        <View style={{ flex: 1 }}>

            <AppIntroSlider
                renderItem={renderItem}
                data={slides}
                dotClickEnabled={true}
                dotStyle={styles.Dotted}
                activeDotStyle={styles.activeDoted}
                doneLabel={i18n.t('start')}
                renderDoneButton={renderDoneButton}
                renderNextButton={renderNextButton}

            />
        </View>
    )
}


const styles = StyleSheet.create({
    slide:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.BgBlue
    },
    container: {
        position: 'absolute',
        bottom: height * .22
    },
    ImgsSlide: {
        width,
        height
    },
    title: {
        textAlign: 'center',
        fontSize: width * .06,
        fontFamily: 'flatMedium',
        color: Colors.fontBold
    },
    Dotted: {
        backgroundColor: Colors.IconBlack,
        width: 8,
        height: 8,
        bottom: 40


    },
    text: {
        paddingHorizontal: 20,
        fontFamily: 'flatMedium',
        lineHeight: 20,
        color: Colors.fontBold,
        paddingVertical: 5,
        fontSize: width * .026,
        alignSelf: I18nManager.isRTL ? 'flex-start' : 'flex-end',
        textAlign: I18nManager.isRTL ? 'right' : 'left'
    },
    activeDoted: {
        backgroundColor: Colors.sky,
        height: 10,
        width: 20,
        bottom: 40
    },
    Button: {
        bottom: Platform.OS === 'ios' ? -20 : -18,
        width,
        backgroundColor: Colors.sky,
        flex: 1,
        marginHorizontal: -16,
        alignItems: 'center',
        padding: Platform.OS === 'ios' ? 15 : 10

    },
    textBtn: {
        color: Colors.bg,
        fontFamily: 'flatMedium',
        textAlign: 'center',
        fontWeight: '200',
        fontSize: 20,
    },
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default Slider