import { DownOutline, UpOutline } from 'antd-mobile-icons';
import './index.scss';
import { useMemo, useState } from 'react';
function DailyBill({ day, dayBills }) {

    // dayBills:  [{date: "2025-12-05 10:10:30", id: "12", money: 120,…}]
    const date = new Date(day);
    const [showList, setShowList] = useState(false);

    // 统计一天数据
    const dayResult = useMemo(() => {
        const pay = dayBills.filter(e => e.type === 'pay').reduce((acc, cur) => acc + cur.money, 0);
        const income = dayBills.filter(e => e.type === 'income').reduce((acc, cur) => acc + cur.money, 0);
        const total = income - pay;
        return { pay, income, total };
    }, [dayBills]);

    return (
        <div className="daily-bill-info">
            <div className="daily-item">
                <div className="daily-title weight line">
                    <div>{`${date.getMonth() + 1}月${date.getDay()}日`}</div>
                    <div onClick={() => setShowList(!showList)}>
                        {showList ? <DownOutline /> : <UpOutline />}
                    </div>
                </div>
                <div className="daily-detail line">
                    <div className="pay"><span>支出</span> {dayResult.pay}</div>
                    <div className="income">收入 {dayResult.income}</div>
                    <div className="total"><span className='weight'>{dayResult.total}</span> 结余</div>
                </div>
            </div>
            <div className="daily-detail-list" style={{ display: showList ? 'block' : 'none' }}>
                <div className='item'>
                    <div>酒水饮料</div>
                    <div><span>-100</span></div>
                </div>
                <div className='item'>
                    <div>甜品零食</div>
                    <div><span>-18</span></div>
                </div>
            </div>
        </div>
    )

}

export default DailyBill;