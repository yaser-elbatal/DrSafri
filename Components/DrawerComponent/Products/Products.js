import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Text, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator, Platform, } from 'react-native';
import { CheckBox, } from "native-base";


import HomeHeader from '../../../common/HomeHeader'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors';
import { InputIcon } from '../../../common/InputText';
import { width, height } from '../../../consts/HeightWidth';
import BTN from '../../../common/BTN';
import Card from '../../../common/Card';
import { useSelector, useDispatch } from 'react-redux';
import { GetProducts, DeleteProduct, SerachForPorducts, GetOneProducts, resetStates } from '../../../store/action/ProductAction';
import Container from '../../../common/Container';
import { Dropdown } from 'react-native-material-dropdown';
import { MenueInfo } from '../../../store/action/MenueAction';
import { Toast } from "native-base";
import { useIsFocused } from '@react-navigation/native';


const isIOS = Platform.OS === 'ios';

function Products({ navigation }) {

    const dispatch = useDispatch();

    const [isSelected2, setSelection2] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [Search, setSearch] = useState('');
    const [Loader, setLoader] = useState(true)
    const [loading, setloading] = useState(false)

    const isFocused = useIsFocused();

    let myProducts = useSelector(state => state.product.products);
    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const Menue = useSelector(state => state.menue.menue.data);
    const totalPage = useSelector(state => state.product.totalpage);
    const [randomUserData, SetrandomUserData] = useState([])
    const [page, setpage] = useState(1)
    const [DeleteArr, setDeleteArr] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setpage(1)
        dispatch(GetProducts(token, lang, 1)).then(() => setRefreshing(false));
    }, []);


    const data2 = [
        {
            label: i18n.t('latest'),
            value: 1,
        },
        {
            label: i18n.t('oldest'),
            value: 2,
        },
    ];



    useEffect(() => {
        setpage(1)
        if (isFocused) {
            setpage(1)
            setLoader(true)
            setpage(1)
            dispatch(GetProducts(token, lang, page)).then(() => dispatch(MenueInfo(lang, token)).then(() => setLoader(false))
            )



        }




    }, [isFocused]);




    console.log("t" + totalPage);
    const isChecked = (itemId) => {
        const isThere = DeleteArr.includes(itemId);
        return isThere;
    };

    const toggleChecked = (itemId) => {

        if (isChecked(itemId)) {

            let Deleted = DeleteArr.filter((id) => id !== itemId);
            setDeleteArr(Deleted)

        }
        else {
            setDeleteArr(DeleteArr.concat([itemId]))
        }
    };

    const handleChandDrpDown = (val) => {
        setLoader(true)

        myProducts.reverse()


        setLoader(false)


    }

    const SelectAllChecked = () => {
        if (isSelected2) {
            setSelection2(false);
            setDeleteArr([])
        }

        else {
            setSelection2(true);
            let MnueID = myProducts.map(menu => menu.id)
            setDeleteArr(MnueID)
        }
    }

    const DeleteMenueMultiIteM = () => {
        setLoader(true)

        dispatch(DeleteProduct(token, lang, DeleteArr)).then(() => { setpage(1), dispatch(GetProducts(token, lang, 1)) }).then(() => setSelection2(false), setLoader(false))
        setDeleteArr([])
        setloading(false)

    }


    const DeletProduct = (id) => {

        setLoader(true)
        dispatch(DeleteProduct(token, lang, id)).then(() => { setpage(1), dispatch(GetProducts(token, lang, 1)) }).then(() => setLoader(false))
        setDeleteArr([])
        setloading(false)



    }

    const handleChange = (e) => {
        setLoader(true)

        setSearch(e);

        if (e == '') {
            setLoader(true)
            dispatch(SerachForPorducts(token, lang, e))
        }
        setTimeout(() => dispatch(SerachForPorducts(token, lang, e)).then(() => setLoader(false)), 1000)

    }
    console.log('Page' + page);


    const onEndReach = () => {

        if (totalPage < page) {
            setloading(false);
            return;

        }
        setloading(true)
        setpage(page + 1);
        dispatch(GetProducts(token, lang, page))
        setloading(false)




    }
    const Ids = myProducts ? [...new Set(myProducts.map(item => item.id))] : []
    const NOT_REDUNDUNT = Ids.map(id => myProducts.find(item => item.id == id))
    return (

        <View style={{ flex: 1, backgroundColor: Colors.bg }}>

            {


                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={NOT_REDUNDUNT}
                    extraData={Loader}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />}
                    onEndReached={onEndReach}
                    onEndReachedThreshold={isIOS ? .01 : .05}
                    onScroll={() => setloading(true)
                    }

                    renderItem={({ item, index }) => {
                        return (
                            <Container loading={Loader}>

                                <TouchableOpacity onPress={() => navigation.navigate('ProductDet', { ProductsId: item.id })}>
                                    <View style={styles.Card}>
                                        <View style={{ flexDirection: 'row', flex: .75 }}>
                                            <Image source={{ uri: item.image }} style={{ height: '100%', width: '40%' }} />
                                            <View style={styles.FWrab}>
                                                <CheckBox checked={isChecked(item.id)} color={isChecked(item.id) ? Colors.sky : '#DBDBDB'} style={{ backgroundColor: isChecked(item.id) ? Colors.sky : Colors.bg, marginStart: -10, borderRadius: 5 }} onPress={() => toggleChecked(item.id)} />
                                                <Text style={styles.nText}>{i18n.t('num')} # {index + 1}</Text>

                                                <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.name, { color: Colors.IconBlack, alignSelf: 'flex-start', width: 130 }]} numberOfLines={1} >{item.menu + ' ـــ '}{item.name}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={styles.nText}>{item.price - (item.price * (item.discount / 100))} {i18n.t('Rial')}</Text>
                                                    {
                                                        item.discount == 0 ? null :
                                                            <Text style={[styles.nText, { color: 'red', textDecorationLine: 'line-through', textDecorationColor: Colors.RedColor, textDecorationStyle: 'solid', paddingHorizontal: 5, fontSize: 14 }]}>{item.price} {i18n.t('Rial')}</Text>
                                                    }
                                                </View>


                                            </View>
                                        </View>


                                        <View style={styles.SWarb}>

                                            <TouchableOpacity style={styles.Edit} onPress={() => navigation.navigate('EditProducts', { ProductsId: item.id })}>
                                                <Image source={require('../../../assets/Images/Icon_edit.png')} style={styles.Img} resizeMode='contain' />
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.Delete} onPress={() => DeletProduct(item.id)}>
                                                <Image source={require('../../../assets/Images/trash_white.png')} style={styles.Img} resizeMode='contain' />
                                            </TouchableOpacity>

                                        </View>

                                    </View>
                                </TouchableOpacity>
                            </Container>

                        )
                    }}
                    ListFooterComponent={
                        loading ? (
                            <ActivityIndicator
                                color="red"
                                style={{ marginLeft: 8 }} size={'large'} />
                        )
                            : null
                    }
                    ListHeaderComponent={<>
                        <HomeHeader navigation={navigation} onPress={() => navigation.navigate('MyProfile')} label={i18n.t('products')} />

                        <InputIcon
                            placeholder={i18n.t('search1')}
                            label={i18n.t('search1')}
                            value={Search}
                            onChangeText={(e) => handleChange(e)}
                            image={require('../../../assets/Images/search.png')}
                            styleCont={{ marginTop: 0, height: 70, }}
                            inputStyle={{ borderRadius: 10 }}

                        />

                        <Card />


                        <View style={{ height: 60, width: '90%', margin: 20, flexDirection: 'row', alignItems: 'center', zIndex: 10, backgroundColor: '#F6F6F6', }}>
                            <TouchableOpacity onPress={SelectAllChecked} style={{ flexDirection: 'row', alignItems: 'center' }}>

                                <CheckBox checked={isSelected2} color={isSelected2 ? Colors.sky : '#DBDBDB'} style={{ backgroundColor: isSelected2 ? Colors.sky : Colors.bg, marginStart: -5, borderRadius: 5 }} onPress={SelectAllChecked} />
                                <Text style={{ marginStart: 12, fontFamily: 'flatMedium', color: Colors.inputTextMainColor, fontSize: width * .03, paddingHorizontal: 5 }}>{i18n.t('Select')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={DeleteArr.length == 0 ?
                                () => Toast.show({
                                    text: i18n.t('SelectElement'),
                                    type: "danger",
                                    duration: 3000,
                                    textStyle: {
                                        color: "white",
                                        textAlign: 'center'
                                    }
                                })
                                : DeleteMenueMultiIteM} style={{ borderWidth: .4, paddingHorizontal: 15, backgroundColor: Colors.bg, alignItems: 'center', justifyContent: 'center', height: width * .09, borderColor: Colors.InputColor, }}>
                                <Text style={{ fontFamily: 'flatMedium', color: Colors.inputTextMainColor, }}> {i18n.t('delete')}</Text>
                            </TouchableOpacity>



                            <Text style={{ fontFamily: 'flatMedium', fontSize: width * .03, paddingHorizontal: 2, color: Colors.inputTextMainColor }}>{i18n.t('filter')}</Text>
                            <View style={{ borderWidth: .4, alignItems: 'center', justifyContent: 'center', height: width * .09, backgroundColor: Colors.bg, borderColor: Colors.InputColor, marginHorizontal: 5 }}>
                                <Dropdown
                                    placeholder={i18n.t('select')}
                                    data={data2}
                                    style={{ fontFamily: 'flatMedium', }}
                                    animationDuration={0}
                                    onChangeText={(val) => handleChandDrpDown(val)}
                                    fontSize={14}
                                    itemTextStyle={{ fontFamily: 'flatMedium' }}
                                    lineWidth={0}

                                    containerStyle={{ width: width * .22, paddingHorizontal: 5, bottom: 10 }}
                                />
                            </View>

                        </View>



                        <BTN title={i18n.t('AddProd')} ContainerStyle={styles.LoginBtn} onPress={!Menue || !Menue.length ? () => navigation.navigate('Menue', { pathname: 'yasser' }) : () => navigation.navigate('AddProduct')} />

                    </>} />

            }

        </View>

    )
}
const styles = StyleSheet.create({
    wrab: {
        overflow: 'hidden',
    },
    Linear: {
        borderTopStartRadius: 0,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderTopRightRadius: 25,
        marginStart: 5,
        marginTop: 10,
        marginEnd: 5,
        height: height * .16,
        width: width * .28,
        flex: 1
    },
    Text: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.bg,
        textAlign: 'center'
    },
    LoginBtn: {
        marginVertical: 5,
        borderRadius: 5,
        marginHorizontal: 20,
        marginTop: 0,
        width: '90%',
        zIndex: 0

    },
    Card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 130,
        width: '90%',
        marginStart: 20,
        marginVertical: 5,
        shadowColor: Colors.bg,
        marginTop: 0,
        backgroundColor: Colors.bg,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

    },
    FWrab: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginStart: 5
    },
    nText: {
        color: Colors.sky,
        fontFamily: 'flatMedium',
        paddingVertical: 3,
        alignSelf: 'flex-start'

    },
    nMenu: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        paddingVertical: 5

    },
    name: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.fontNormal,
        paddingVertical: 5
    },
    SWarb: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flex: .25,
    },
    Edit: {
        backgroundColor: '#E3E3E3',
        height: '50%',
        justifyContent: 'center',
        width: 35
    },
    Delete: {
        backgroundColor: Colors.RedColor,
        height: '50%',
        justifyContent: 'center', width: 35
    },
    Img: {
        height: 20,
        width: 20,
        alignSelf: 'center'
    },
    Modal: {
        flex: 1,
        backgroundColor: Colors.bg,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        marginTop: height * .55,
    }
})
export default Products
