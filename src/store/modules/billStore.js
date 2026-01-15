// 账单列表store
import { fetchBillList123 } from "../../api/index";
import { createSlice } from "@reduxjs/toolkit";

const billStore = createSlice({
    name: "billList",
    initialState: {
        billList: [],
    },
    reducers: {
        addBill: (state, action) => {
            state.billList.push(action.payload);
        },
        setBillList: (state, action) => {
            state.billList = action.payload;
        },
    },
});

export const { addBill, setBillList } = billStore.actions;

// 编写异步
const getBillList = () => {
    return async (dispatch) => {
        // const res = await axios.get("http://192.168.31.140:8888/ka");
        const res = await fetchBillList123();
        // dispatch(setBillList(res.data));
        dispatch(setBillList(res));
    };
};

export { getBillList };

const reducer = billStore.reducer;
export default reducer;