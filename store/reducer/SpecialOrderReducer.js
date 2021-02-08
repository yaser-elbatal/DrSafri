import { Get_Special_Orders, Get_Special_Orders_det } from "../action/SpecialOrderDetailes";

const initialState = { SpecOrders: [], SpecOrderDet: {} }
export default (state = initialState, action) => {
    switch (action.type) {

        case Get_Special_Orders:
            return { SpecOrders: action.data.data }
        case Get_Special_Orders_det:
            return { SpecOrderDet: action.data.data }

        default:
            return state;
    }
}