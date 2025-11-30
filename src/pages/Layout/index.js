import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div>
            <h1>year</h1>
            <Outlet />
        </div>
    );
}

export default Layout;