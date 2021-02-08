import { Get_RePorts, Get_Extra_Reborts } from "../action/HomeAction";
import { Add_product } from "../action/ProductAction";

const initialState = { reports: {}, product: [], extra: {}, NotifyCount: {} }
export default (state = initialState, action) => {
    switch (action.type) {

        case Get_Extra_Reborts:
            return { ...state, product: action.data.data, extra: action.data.extra }
        case Get_RePorts:
            return { ...state, reports: action.data.data, }


        case 'NotificationCount':
            return { ...state, NotifyCount: action.data, }

        default:
            return state;
    }
}