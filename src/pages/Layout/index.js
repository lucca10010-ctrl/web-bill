import { Badge, TabBar } from 'antd-mobile';
import {
    AddCircleOutline,
    BillOutline,
    CalculatorOutline,
    UserOutline
} from 'antd-mobile-icons';
import { useState } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';
import './index.scss';
function Layout() {

    const navigate = useNavigate();

    // 切换菜单路由
    const setRouteActive = (path) => {
        navigate(path);
    }

    const tabs = [
        {
            key: 'month',
            title: '月度账单',
            icon: <BillOutline />,
            badge: Badge.dot,
        },
        {
            key: 'newBill',
            title: '记账',
            icon: <AddCircleOutline />,
        },
        {
            key: 'year',
            title: '年度账单',
            icon: <CalculatorOutline />,
            badge: Badge.dot,
        },
        {
            key: 'personalCenter',
            title: '我的',
            icon: <UserOutline />,
        },
    ]


    return (
        <div className='layout'>

            <div className="container">
                <Outlet />
            </div>

            <div className="footer">
                <TabBar onChange={value => setRouteActive(value)}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} badge={item.badge} />
                    ))}
                </TabBar>
            </div>
        </div>
    )
}

export default Layout;