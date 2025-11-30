import { getBillList } from "@/store/modules/billStore";
import { Button } from "antd-mobile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function Layout() {
    const billList = useSelector((state) => state.bill.billList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBillList());
    }, [dispatch]);

    useEffect(() => {
        console.log("billList", billList);
    }, [billList]);

    return (
        <div>
            <h1>year</h1>
            <Outlet />

            <Button color="primary">测试全局</Button>
            <div className="puple">
                <Button color="primary">局部全局</Button>
            </div>
        </div>
    );
}

export default Layout;