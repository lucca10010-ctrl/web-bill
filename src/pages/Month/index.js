import { DatePicker, NavBar } from 'antd-mobile';
import {
  DownOutline,
  UpOutline
} from 'antd-mobile-icons';
import { useEffect, useMemo, useState } from 'react';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getBillList } from '../../store/modules/billStore';
import DailyBill from './comonents/DailyBill';
function Month() {

  const [dateVisiable, setDateVisiable] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  // 按月分组的数据
  const [currentMonthList, setCurrentMonthList] = useState([]);

  const billList = useSelector(state => state.bill.billList);
  const dispatch = useDispatch();

  // 获取账单列表
  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);


  // 按月分组的数据 {2025-12: [{},{}], 2025-11: [{},{}]}
  const monthGroup = useMemo(() => {
    return groupByMonth(billList);
  }, [billList]);


  // 获取指定月份的账单
  useEffect(() => {
    const key = getKey(currentDate);
    if (monthGroup[key]) {
      setCurrentMonthList(monthGroup[key]);
    }
  }, [currentDate, monthGroup]);

  // 选择指定日期
  function dateOnConfirm(date) {
    setDateVisiable(false);
    setCurrentDate(date);
  }



  // 统计数据
  const result = useMemo(() => {
    const pay = currentMonthList.filter(e => e.type === 'pay').reduce((acc, cur) => acc + cur.money, 0);
    const income = currentMonthList.filter(e => e.type === 'income').reduce((acc, cur) => acc + cur.money, 0);
    const total = income - pay;
    return { pay, income, total };
  }, [currentMonthList]);


  function getKey(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const key = `${year}-${month}`;
    return key;
  }

  // 按月分组的数据 {2025-12: [{},{}], 2025-11: [{},{}]}
  function groupByMonth(list) {
    return list.reduce((acc, cur) => {
      const date = new Date(cur.date);
      const key = getKey(date);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(cur);
      return acc;
    }, {});
  }


  return (
    <div className="month-bill">
      <div className="title">
        {/* <div>{JSON.stringify(monthGroup)}</div> */}
        <NavBar backIcon={false}>月度账单</NavBar>
      </div>
      <div className="top">
        <div className="date" onClick={() => setDateVisiable(true)}>
          <div className='year'>{currentDate.getFullYear()}</div>
          <div className=''>|</div>
          <div className='month'>{currentDate.getMonth() + 1} 月账单</div>
          <div className='icon'>{dateVisiable ? <DownOutline /> : <UpOutline />}</div>
        </div>
        <div className="detail">
          <div className="item">
            <div className="amout">{Number(result.pay.toFixed(2))}</div>
            <div className="desc">支出</div>
          </div>
          <div className="item">
            <div className="amout">{Number(result.income.toFixed(2))}</div>
            <div className="desc">收入</div>
          </div>
          <div className="item">
            <div className="amout">{Number(result.total.toFixed(2))}</div>
            <div className="desc">结余</div>
          </div>
        </div>
        <DatePicker visible={dateVisiable}
          precision='month'
          onConfirm={dateOnConfirm}
          onClose={() => setDateVisiable(false)} max={new Date()} />
      </div>
      {/* 单日列表 */}
      <DailyBill/>
    </div>
  );
}

export default Month;