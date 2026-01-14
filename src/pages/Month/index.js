import { DatePicker, NavBar } from 'antd-mobile';
import {
  DownOutline,
  UpOutline
} from 'antd-mobile-icons';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBillList } from '../../store/modules/billStore';
import DailyBill from './comonents/DailyBill';
import './index.scss';
function Month() {
  // 麻烦在数据处理上， 实际应该让后端处理， 这里相当于是查出数据库所有数据，再处理

  const [dateVisiable, setDateVisiable] = useState(false);
  // const [currentDate, setCurrentDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date('2025-11-01'));
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
    return groupByXX(list, date => getKey(date));
  }

  // 按日分组的数据  {2025-12-01: [{},{}], 2025-12-02: [{},{}]}
  function groupByDay(list) {
    return groupByXX(list, date => getKey(date) + '-' + date.getDate());
  }

  function groupByXX(list, getKey) {
    console.log('groupByXX list:', list);
    if(!list){
      return {};
    }
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


  const dayGroupData = useMemo(() => {
    // 按日分组的数据  {2025-12-01: [{},{}], 2025-12-02: [{},{}]}
    const dayGroup = groupByDay(currentMonthList);
    return {
      dayGroup,
      days: Object.keys(dayGroup)
    };
  }, [currentMonthList]);



  return (
    <div className="month-bill">
      <div className="title weight">
        {/* <div>{JSON.stringify(monthGroup)}</div> */}
        <NavBar backIcon={false}>月度账单</NavBar>
      </div>
      <div className="top">
        <div className="date weight" onClick={() => setDateVisiable(true)}>
          <div className='year'>{currentDate.getFullYear()}</div>
          <div className=''>|</div>
          <div className='month'>{currentDate.getMonth() + 1} 月账单</div>
          <div className='icon'>{dateVisiable ? <DownOutline /> : <UpOutline />}</div>
        </div>
        <div className="detail">
          <div className="item">
            <div className="amout weight">{Number(result.pay.toFixed(2))}</div>
            <div className="desc">支出</div>
          </div>
          <div className="item">
            <div className="amout weight">{Number(result.income.toFixed(2))}</div>
            <div className="desc">收入</div>
          </div>
          <div className="item">
            <div className="amout weight">{Number(result.total.toFixed(2))}</div>
            <div className="desc">结余</div>
          </div>
        </div>
        <DatePicker visible={dateVisiable}
          precision='month'
          onConfirm={dateOnConfirm}
          onClose={() => setDateVisiable(false)} max={new Date()} />
      </div>
      {/* 单日列表 */}
      <div className='daily-bill' >
        {
          dayGroupData.days.map(day => (
            <DailyBill day={day} dayBills={dayGroupData.dayGroup[day]} />
          ))
        }
      </div>
    </div>
  );
}

export default Month;