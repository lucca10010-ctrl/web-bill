import { DatePicker, NavBar } from 'antd-mobile';
import './index.scss'
import {
  UpOutline,
  RightOutline,
  DownOutline,
} from 'antd-mobile-icons';
import { useState } from 'react';
function Month() {

  const [dateVisiable, setDateVisiable] = useState(false);

  function dateOnConfirm() {
    setDateVisiable(false)
  }

  return (
    <div className="month-bill">
      <div className="title">
        <NavBar backIcon={false}>月度账单</NavBar>
      </div>
      <div className="top">
        <div className="date" onClick={() => setDateVisiable(true)}>
          <div className='year'>2023</div>
          <div className=''>|</div>
          <div className='month'>3月账单</div>
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
          onConfirm={dateOnConfirm}
          onClose={() => setDateVisiable(false)} max={new Date()} />
      </div>
    </div>
  );
}

export default Month;