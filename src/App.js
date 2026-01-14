import './App.css';
import TestGrid from './pages/TestGrid';

function App() {
  const model = document.querySelector('.item1');
  model.addEventListener('mousedown', startDrag);
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  function startDrag(e) {
    e.preventDefault();
    isDragging = true;
    // 获取鼠标初始位置
    initialX = e.clientX;
    initialY = e.clientY;
    let rect = model.getBoundingClientRect();
    currentX = rect.left;
    currentY = rect.top;

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
  }

  function drag(e) {
    if (!isDragging) return;

    e.preventDefault();
    // 计算移动距离
    let dx = e.clientX - initialX;
    let dy = e.clientY - initialY;

    // 更新弹窗位置
    model.style.left = currentX + dx + 'px';
    model.style.top = currentY + dy + 'px';
  }

  function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
  }

  return (
    <div className="App" style={{ width: '100%', background: '#f5f5f5', position: 'relative' }}>
      {/* <TestGrid></TestGrid> */}
      <div style={{
        backgroundColor: 'orange', height: 30, width: 30, cursor: 'pointer',
        position: 'absolute'
      }} className='item1'>close</div>
      <div style={{ backgroundColor: 'red', marginTop: 30, height: 30 }}>222</div>
    </div>
  );
}

export default App;
