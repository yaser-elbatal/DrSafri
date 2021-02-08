import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native'

import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors';
import Header from '../../../common/Header';
import { InputIcon } from '../../../common/InputText';
import Card from '../../../common/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { GetSpecialOrders } from '../../../store/action/SpecialOrderDetailes';

const { width, height } = Dimensions.get('window')

function IncomingSpecialOrder({ navigation, route }) {

    const [isSelected, setSelection] = useState();
    const [selected, setSelected] = useState("key0")
    const [selected1, setSelected1] = useState("key0")
    const { statues, label } = route.params
    const dispatch = useDispatch()
    const isFocused = useIsFocused();

    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const SpecialOrder = useSelector(state => state.SpecOrders.SpecOrders);
    useEffect(() => {
        if (isFocused) {
            dispatch(GetSpecialOrders(token, statues, lang))
        }
    }, [isFocused]);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bg }}>
            <Header navigation={navigation} label={label} />
            <InputIcon
                label={i18n.t('search1')}
                placeholder={i18n.t('search1')}
                image={require('../../../assets/Images/search.png')}
                styleCont={{ marginTop: 20, }}
            />
            <Card />

            {/* <DrobDwn /> */}






            <FlatList
                showsVerticalScrollIndicator={false}
                data={SpecialOrder}
                keyExtractor={(item) => item.id}
                renderItem={(item) => (
                    <TouchableOpacity onPress={() => navigation.navigate('IcomingSpecialOrderDetailes', { OrderId: item.item.order_id })} style={{ marginTop: 10 }}>
                        <View style={styles.Card}>
                            <View style={{ margin: 10, justifyContent: 'center' }}>
                                {/* <CheckBox checked={isSelected} color={isSelected ? Colors.sky : '#DBDBDB'} style={{ backgroundColor: isSelected ? Colors.sky : Colors.bg, width: width * .05, height: 20, marginHorizontal: 2 }} onPress={() => setSelection(!isSelected)} /> */}

                                <Text style={styles.nText}>{i18n.t('num')} :  # {item.item.order_id}</Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                        <Text style={styles.name}>{i18n.t('rebresentativename')}</Text>
                                        <Text style={[styles.name, { marginVertical: 5 }]}>{i18n.t('time')}</Text>
                                        <Text style={styles.name}>{i18n.t('totaly')}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                        <Text style={{ marginHorizontal: 20 }}>:</Text>
                                        <Text style={{ marginVertical: 5, marginHorizontal: 20 }}>:</Text>
                                        <Text style={{ marginHorizontal: 20 }}>:</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                        <Text style={[styles.sname, { alignSelf: 'flex-start' }]}> {item.item.provider.name}</Text>
                                        <Text style={[styles.sname, { marginVertical: 5, alignSelf: 'flex-start' }]}> {item.item.date} </Text>
                                        <Text style={[styles.sname, { color: Colors.sky, alignSelf: 'flex-start' }]}> {item.item.price == 0 ? i18n.t('waitPrice') : item.item.price + i18n.t('RS')} </Text>
                                    </View>
                                </View>

                            </View>
                        </View>
                    </TouchableOpacity>

                )
                } />
        </View >
    )
}
const styles = StyleSheet.create({
    Linear: {
        borderTopStartRadius: 0,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderTopRightRadius: 25,
        marginStart: 5,
        marginTop: 10,
        marginEnd: 5,
        height: height * .18,
        width: width * .28,
        flex: 1
    },

    nText: {
        color: Colors.sky,
        marginVertical: 5,
        fontFamily: 'flatMedium',

    },
    Text: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.bg,
        textAlign: 'center'
    },
    nMenu: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        marginHorizontal: 15,
        textAlign: 'center'
    },
    name: {
        fontFamily: 'flatMedium',
        fontSize: 10,
        color: Colors.fontNormal
    },
    Card: {

        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 140,
        width: '90%',
        marginHorizontal: 20,
        shadowColor: Colors.bg,
        margin: 5,
        backgroundColor: Colors.bg,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        marginTop: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,


    },
    name: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.fontNormal
    },
    sname: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.IconBlack
    },
    Contain: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,

    }


})

export default IncomingSpecialOrder
