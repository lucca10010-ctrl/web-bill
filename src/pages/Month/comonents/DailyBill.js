import { DownOutline } from 'antd-mobile-icons';
import './index.scss';
import { useMemo } from 'react';
function DailyBill({ day, dayBills }) {

    // dayBills:  [{date: "2025-12-05 10:10:30", id: "12", money: 120,…}]
    const date = new Date(day);

    // 统计一天数据
    const dayResult = useMemo(() => {
        const pay = dayBills.filter(e => e.type === 'pay').reduce((acc, cur) => acc + cur.money, 0);
        const income = dayBills.filter(e => e.type === 'income').reduce((acc, cur) => acc + cur.money, 0);
        const total = income - pay;
        return { pay, income, total };
    }, [dayBills]);

    return (
        <div className="daily-item">
            <div className="daily-title weight">
                <div>{`${date.getMonth() + 1}月${date.getDay()}日`}</div>
                <div><DownOutline /></div>
            </div>
            <div className="daily-detail">
                <div className="pay"><span>支出</span> {dayResult.pay}</div>
                <div className="income">收入 {dayResult.income}</div>
                <div className="total"><span className='weight'>{dayResult.total}</span> 结余</div>
            </div>
        </div>
    )

}

export default DailyBill;