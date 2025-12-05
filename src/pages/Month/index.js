import { DatePicker, NavBar } from 'antd-mobile';
import {
  DownOutline,
  UpOutline
} from 'antd-mobile-icons';
import { useState } from 'react';
import './index.scss';
function Month() {

  const [dateVisiable, setDateVisiable] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  function dateOnConfirm(date) {
    setDateVisiable(false);
    setCurrentDate(date);
  }

  return (
    <div className="month-bill">
      <div className="title">
        <NavBar backIcon={false}>月度账单</NavBar>
      </div>
      <div className="top">
        <div className="date" onClick={() => setDateVisiable(true)}>
          <div className='year'>{currentDate.getFullYear()}</div>
          <div className=''>|</div>
          <div className='month'>{currentDate.getMonth()} 月账单</div>
          <div className='icon'>{dateVisiable ? <DownOutline /> : <UpOutline />}</div>
        </div>
        <div className="detail">
          <div className="item">
            <div className="amout">100</div>
            <div className="desc">支持</div>
          </div>
          <div className="item">
            <div className="amout">200</div>
            <div className="desc">收入</div>
          </div>
          <div className="item">
            <div className="amout">200</div>
            <div className="desc">结余</div>
          </div>
        </div>
        <DatePicker visible={dateVisiable}
          precision='month'
          onConfirm={dateOnConfirm}
          onClose={() => setDateVisiable(false)} max={new Date()} />
      </div>
    </div>
  );
}

export default Month;