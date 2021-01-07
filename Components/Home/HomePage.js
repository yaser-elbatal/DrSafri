import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity, FlatList, RefreshControl } from 'react-native';

import HomeHeader from '../../common/HomeHeader'
import Colors from '../../consts/Colors';
import { width, height } from '../../consts/HeightWidth';
import i18n from '../../locale/i18n'
import Card from '../../common/Card'
import { useSelector, useDispatch } from 'react-redux';
import { GetHomeProducts, GetQuickReborts } from '../../store/action/HomeAction';
import Container from '../../common/Container';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications'
import { Logout } from '../../store/action/AuthAction';

import { useIsFocused } from '@react-navigation/native';


function HomePage({ navigation }) {

    const user = useSelector(state => state.auth.user.data);
    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const HomeProduct = useSelector(state => state.home.product);
    const QuickRebort = useSelector(state => state.home.extra);

    const dispatch = useDispatch();

    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = useState(false);
    const [spinner, setSpinner] = useState(true);





    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(GetHomeProducts(token, lang)).then(() => dispatch(GetQuickReborts(token, lang))).then(() => setSpinner(false))

        });

        const subscription = Notifications.addNotificationReceivedListener(notification => {
            let type = notification.request.content.data.type;
            let OrderId = notification.request.content.data.order_id;

            if (type === 'block') {
                dispatch(Logout(token))

            }
            else if (type === 'admin') {
                navigation.navigate('Notifications')
            }
            else if (type === 'wallet') {
                navigation.navigate('Wallet')

            }
            else if (type === 'order' && OrderId) {
                navigation.navigate('OrderDetailes', { OrderId: notification.request.content.data.order_id })

            }

        });

        const subscriptions = Notifications.addNotificationResponseReceivedListener(response => {
            const type = response.notification.request.content.data.type;
            if (type === 'block') {

                dispatch(Logout(token))
            }
        });
        setSpinner(false)
        return () => { subscription.remove(), unsubscribe, subscriptions };
    }, [])


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(GetHomeProducts(token, lang));
        dispatch(GetQuickReborts(token, lang)).then(() => setRefreshing(false));
    }, []);

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, }}
            refreshControl={< RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <HomeHeader navigation={navigation} image={user.avatar} label={i18n.t('Hello') + user.name + '!'} title={i18n.t('Dash')} onPress={() => navigation.navigate('MyProfile')} />
            <Card />

            <Text style={[styles.MainText, { marginBottom: 0 }]}>{i18n.t('newProduct')}</Text>
            <Container loading={spinner} >

                {
                    HomeProduct && HomeProduct.length ?

                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={HomeProduct}
                            extraData={spinner}
                            horizontal={true}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item, index }) => (

                                <TouchableOpacity style={styles.Card} key={item.id} onPress={() => navigation.navigate('ProductDet', { ProductsId: item.id, index: index })}>
                                    <View style={{ flexDirection: 'column', flex: 1 }}>
                                        <Image source={{ uri: item.image }} style={{ width: '100%', flex: .8 }} />
                                        <View style={{ margin: 10, flex: .2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.prod, { fontWeight: '900', width: 100 }]}>{item.name}</Text>
                                            <Text style={[styles.prod, { color: Colors.sky, fontSize: 16 }]}>{item.price} {i18n.t('Rial')}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )} />
                        :
                        < Image source={require('../../assets/Images/empty.png')} style={{ height: 150, width: 150, alignSelf: 'center' }} />

                }

                <Text style={styles.MainText}>{i18n.t('Quickreports')}</Text>
                {
                    QuickRebort ?

                        <Animatable.View animation="fadeInUp" easing="ease-out" delay={500}>

                            <View style={styles.SCard}>
                                <View style={{ flexDirection: 'row', height: '100%', }}>
                                    <View style={styles.ImgWrab}>
                                        <Image source={require('../../assets/Images/nounproducticon.png')} style={styles.SImg} resizeMode='contain' />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                        <View style={styles.WrabText}>
                                            <Text style={styles.ProdText}>{i18n.t('products')}</Text>
                                            <Text style={[styles.ProdText, { color: Colors.fontNormal }]}>{i18n.t('haveProduct')}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.num}>{QuickRebort.reports ? QuickRebort.reports.products : null}</Text>
                                </View>
                            </View>

                            <View style={styles.SCard}>
                                <View style={{ flexDirection: 'row', height: '100%', }}>
                                    <View style={styles.ImgWrab}>
                                        <Image source={require('../../assets/Images/comment.png')} style={styles.SImg} resizeMode='contain' />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                        <View style={styles.WrabText}>
                                            <Text style={styles.ProdText}>{i18n.t('comments')}</Text>
                                            <Text style={[styles.ProdText, { color: Colors.fontNormal }]}>{i18n.t('Storecomments')}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.num}>{QuickRebort.reports ? QuickRebort.reports.comments : null}</Text>
                                </View>
                            </View>

                            <View style={styles.SCard}>
                                <View style={{ flexDirection: 'row', height: '100%', }}>
                                    <View style={styles.ImgWrab}>
                                        <Image source={require('../../assets/Images/star_home.png')} style={styles.SImg} resizeMode='contain' />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                        <View style={styles.WrabText}>
                                            <Text style={styles.ProdText}>{i18n.t('rateing')}</Text>
                                            <Text style={[styles.ProdText, { color: Colors.fontNormal }]}>{i18n.t('Yourfeedbacks')}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.num}>{QuickRebort.reports ? QuickRebort.reports.rates : null}</Text>
                                </View>
                            </View>

                        </Animatable.View>
                        :
                        <Image source={require('../../assets/Images/empty.png')} style={{ height: 150, width: 150, alignSelf: 'center' }} />
                }
            </Container>
        </ScrollView>



    )
}
const styles = StyleSheet.create({
    wrab: {
        width: 100,
        alignSelf: 'center',
        overflow: 'hidden',
        marginEnd: 15,
        marginStart: 10,

        flex: 1
    },
    Linear: {
        flex: 1,
    },
    num: {
        alignSelf: 'center',
        color: Colors.sky,
        marginEnd: 10,
        fontSize: 30,
        fontFamily: 'flatMedium',
    },
    SCard: {
        height: height * .15,
        width: '90%',
        margin: 20,
        shadowColor: Colors.bg,
        backgroundColor: Colors.bg,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        overflow: 'hidden',
        marginTop: -5

    },
    MainText: {
        fontFamily: 'flatMedium',
        fontSize: 20,
        marginVertical: 20,
        alignSelf: 'flex-start',
        marginStart: 5,

    },
    ImgWrab: {
        height: '100%',
        width: 90,
        backgroundColor: '#AAEFFC',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Text: {
        fontFamily: 'flatMedium',
        fontSize: width * .03,
        color: Colors.bg,
        textAlign: 'center'
    },

    ProdText: {
        fontFamily: 'flatMedium',
        fontSize: 15,
        color: Colors.IconBlack,
        alignSelf: 'flex-start',
        paddingVertical: 5
    },
    prod: {
        fontFamily: 'flatMedium',
        fontSize: 14
    },
    Card: {
        margin: 13,
        borderRadius: 20,
        width: width * .55,
        height: height * .25,
        backgroundColor: Colors.bg,
        flex: 1,
        borderTopStartRadius: 0,
        overflow: 'hidden'
    },
    WrabText: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginStart: 15
    },
    SImg: {
        height: '50%',
        width: '50%',
        alignSelf: 'center'
    }
})
export default HomePage
