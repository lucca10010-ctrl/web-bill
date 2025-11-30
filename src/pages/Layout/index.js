import { Button } from "antd-mobile";
import { Outlet } from "react-router-dom";

function Layout() {
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