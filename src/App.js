import { ConfigProvider } from 'antd';
import BaseLayout from 'components/baseLayout';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';
import './App.css';

function App() {
  return (
    <div className="App">
      <ConfigProvider locale={locale}>
        <BaseLayout/>
      </ConfigProvider>
    </div>
  );
}

export default App;
