import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView, Dimensions, Modal, Platform, Linking } from 'react-native'
import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors'
import BTN from '../../../common/BTN'
import { InputIcon } from '../../../common/InputText'
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { GetSpecialOrdersDetailes, AddSpecialPrice } from '../../../store/action/SpecialOrderDetailes'
import { Toaster } from '../../../common/Toaster'
import { ConfirmOrders } from '../../../store/action/OrdersAction'

const { width } = Dimensions.get('screen')
const { height } = Dimensions.get('window')

function IcomingSpecialOrderDetailes({ navigation, route }) {


    const [click, setClick] = useState(true)
    const [click1, setClick1] = useState(true)
    const [click3, setClick3] = useState(true)
    const [click4, setClick4] = useState(true)
    const [IsDeliverMoadl, setIsDeliverMoadl] = useState(false)
    const [price, setprice] = useState('')

    const isFocused = useIsFocused();
    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const { OrderId } = route.params
    const dispatch = useDispatch();
    const SpecOrderDet = useSelector(state => state.SpecOrders.SpecOrderDet);
    console.log(OrderId);
    console.log(SpecOrderDet);

    useEffect(() => {
        if (isFocused) {
            setprice('')
            dispatch(GetSpecialOrdersDetailes(token, OrderId, lang))

        }
    }, [isFocused])

    const _valdaition = () => {
        let piceErr = price == '' ? i18n.t('EnterPrice') : null;
        return piceErr

    }
    const AddSpecPriceFrouser = () => {
        let val = _valdaition()
        if (!val) {
            dispatch(AddSpecialPrice(token, OrderId, price, lang)).then(() => dispatch(GetSpecialOrdersDetailes(token, OrderId, lang)))
            setIsDeliverMoadl(false)

        }
        Toaster(_valdaition());
    }


    const OrderProcceed = () => {

        dispatch(ConfirmOrders(token, OrderId)).then(() => dispatch(GetSpecialOrdersDetailes(token, OrderId, lang)))


    }

    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} label={i18n.t('orderDetailes') + "  " + OrderId} />
            {
                SpecOrderDet &&
                <ScrollView style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => setClick(!click)}>
                        <View style={{ width: '95%', margin: 10, backgroundColor: Colors.InputColor, height: 40, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                                <Text style={styles.nMenu}>{i18n.t('ClientInfo')}</Text>
                                {
                                    click ?

                                        <Image source={require('../../../assets/Images/noun_down_blue.png')} style={{ width: 12, height: 10, top: 5 }} />
                                        :
                                        <Image source={require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, top: 5 }} />

                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                    {
                        click ?
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: '7%' }}>
                                <View style={{ flexDirection: 'column', }}>
                                    <Text style={styles.name}>{i18n.t('rebresentativename')}</Text>
                                    <Text style={[styles.name, { marginVertical: 15 }]}>{i18n.t('phone')}</Text>
                                </View>
                                <View style={{ flexDirection: 'column', alignItems: 'center', }}>
                                    <Text style={{ marginHorizontal: 15 }}>:</Text>
                                    <Text style={{ marginHorizontal: 15, marginVertical: 15 }}>:</Text>
                                </View>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                        <Text style={styles.sname}>{SpecOrderDet.provider.name}</Text>
                                        <TouchableOpacity style={{ alignSelf: 'flex-end', alignItems: 'flex-end', left: width * .24 }} onPress={() => Linking.openURL(`tel:${SpecOrderDet.provider.phone}`)}>
                                            <Image source={require('../../../assets/Images/whatsapp.png')} style={{ width: 20, height: 20, }} resizeMode='contain' />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={[styles.sname, { marginVertical: 15 }]}>{SpecOrderDet.provider.phone}</Text>
                                </View>
                            </View>

                            : null
                    }

                    <TouchableOpacity onPress={() => setClick1(!click1)}>
                        <View style={styles.Container}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                                <Text style={styles.nMenu}>{i18n.t('orderDetailes')}</Text>
                                {
                                    click1 ?

                                        <Image source={require('../../../assets/Images/noun_down_blue.png')} style={{ width: 12, height: 10, top: 5 }} />
                                        :
                                        <Image source={require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, top: 5 }} />

                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                    {
                        click1 ?
                            <View style={{ margin: 20, marginTop: 0 }}>
                                <Text style={{ paddingStart: 20, color: Colors.fontNormal, fontFamily: 'flatMedium', }}>
                                    {SpecOrderDet.details}

                                </Text>
                            </View>


                            : null
                    }
                    <TouchableOpacity onPress={() => setClick3(!click3)}>
                        <View style={styles.Container}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                                <Text style={styles.nMenu}>{i18n.t('Paymentmethod')}</Text>
                                {
                                    click3 ?

                                        <Image source={require('../../../assets/Images/noun_down_blue.png')} style={{ width: 12, height: 10, top: 5 }} />
                                        :
                                        <Image source={require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, top: 5 }} />

                                }
                            </View>
                        </View>
                    </TouchableOpacity>

                    {
                        click3 ?
                            <Text style={[styles.name, { marginHorizontal: 40, marginVertical: 10, marginTop: 0, alignSelf: 'flex-start' }]}>{SpecOrderDet.payment}</Text>
                            :
                            null

                    }
                    {
                        SpecOrderDet.price === 0 ?
                            < BTN title={i18n.t('priceEnter')} ContainerStyle={[styles.LoginBtn, { marginTop: 40 }]} onPress={() => setIsDeliverMoadl(!IsDeliverMoadl)} />
                            :
                            <>
                                <TouchableOpacity onPress={() => setClick4(!click4)}>
                                    <View style={styles.Container}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                                            <Text style={styles.nMenu}>{i18n.t('prices')}</Text>
                                            {
                                                click4 ?

                                                    <Image source={require('../../../assets/Images/noun_down_blue.png')} style={{ width: 12, height: 10, top: 5 }} />
                                                    :
                                                    <Image source={require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, top: 5 }} />

                                            }
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                {
                                    click4 ?
                                        <View style={{ flexDirection: 'row', marginHorizontal: '7%', marginTop: 10 }}>
                                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                                <Text style={styles.name}>{i18n.t('productPrice')}</Text>
                                                <Text style={[styles.name, { marginTop: 5 }]}>{i18n.t('total')}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                                <Text style={{ marginHorizontal: 20, }}>:</Text>
                                                <Text style={{ marginHorizontal: 20 }}>:</Text>
                                            </View>
                                            <View style={{ flexDirection: 'column', justifyContent: 'center', }}>
                                                <Text style={styles.sname}>{SpecOrderDet.price} {i18n.t('Rial')}</Text>
                                                <Text style={[styles.sname, { color: Colors.RedColor, }]}> {SpecOrderDet.total} {i18n.t('Rial')}</Text>
                                            </View>
                                        </View>


                                        : null
                                }
                                {
                                    SpecOrderDet.status === 'WAITING' ?
                                        <Text style={{ color: Colors.RedColor, alignSelf: 'center', fontFamily: 'flatMedium', fontSize: 14, marginTop: 30 }}>{i18n.t('waituser')}</Text>
                                        : null
                                }
                            </>


                    }

                    {
                        SpecOrderDet.status === 'PROGRESS' ?
                            < BTN title={i18n.t('AcceptOrders')} ContainerStyle={styles.LoginBtn} onPress={OrderProcceed} />
                            : SpecOrderDet.status === 'READY' ?
                                < BTN title={i18n.t('ReadyOrder')} ContainerStyle={styles.LoginBtn} onPress={() => navigation.navigate('IncomingSpecialOrder', { statues: 'READY', label: i18n.t('Completedrequests') })} />


                                :
                                null
                    }
                    <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={IsDeliverMoadl}   >

                            <TouchableOpacity style={[styles.centeredView,]} onPress={() => setIsDeliverMoadl(false)}>
                                <View style={[styles.modalView, { backgroundColor: Colors.bg }]}>
                                    <Text style={{ margin: 20, fontFamily: 'flatMedium', marginBottom: 0 }}>{i18n.t('priceEnter')}</Text>
                                    <InputIcon
                                        value={price}
                                        onChangeText={(e) => setprice(e)}
                                        label={i18n.t('OrderPrice')}
                                        placeholder={i18n.t('OrderPrice')}
                                        keyboardType='numeric'
                                        inputStyle={{ borderRadius: 10, color: Colors.IconBlack }}
                                        styleCont={{ marginHorizontal: 10, }}
                                        LabelStyle={{ color: Colors.IconBlack }}
                                    />
                                    < BTN title={i18n.t('send')} ContainerStyle={styles.LoginBtn} onPress={AddSpecPriceFrouser} />
                                </View>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                </ScrollView>

            }
        </View >
    )
}
const styles = StyleSheet.create({
    nMenu: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        marginHorizontal: 15,
        textAlign: 'center'
    },
    name: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        color: Colors.fontNormal
    },
    sname: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        color: Colors.IconBlack
    },
    LoginBtn: {
        marginVertical: 5,
        borderRadius: 5,
        marginHorizontal: 10,
        width: '95%',
        marginTop: 30
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        // backgroundColor: '#737373',
        // opacity: Platform.OS === 'ios' ? .975 : .9,

    },
    modalView: {
        backgroundColor: "white",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        width: width,
        height: height * .3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    Container: {
        width: '95%', margin: 10,
        backgroundColor: Colors.InputColor,
        height: 40, marginTop: 0
    },

})

export default IcomingSpecialOrderDetailes
