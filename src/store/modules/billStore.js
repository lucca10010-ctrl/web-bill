// 账单列表store
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
        const res = await axios.get("http://localhost:8888/ka");
        dispatch(setBillList(res.data));
    };
};

export { getBillList };

const reducer = billStore.reducer;
export default reducer;