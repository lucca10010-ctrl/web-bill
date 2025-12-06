import './index.scss'
import {
    DownOutline,
    UpOutline
} from 'antd-mobile-icons';
function DailiBill() {



    return (
        <div className='daily-bill' >
            <div className="daily-item">
                <div className="daily-title">
                    <div>12月01日</div>
                    <div><DownOutline/></div>
                </div>
                <div className="daily-detail">
                    <div className="pay"><span>支出</span> 100</div>
                    <div className="income">收入 100</div>
                    <div className="total"><span>100</span> 结余</div>
                </div>
            </div>
        </div>
    )

}

export default DailiBill;