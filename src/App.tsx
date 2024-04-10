import './App.css';
import SideBar from './components/SideBar';
import Content from './components/Content';
import { useState } from 'react';

function App() {

  const [data, set_data] = useState(null);
  const [err_msg, set_err_msg] = useState("")

  return (
    <div className='flex flex-col lg:flex-row w-full lg:h-screen'>
      <SideBar set_data={set_data} set_err_msg={set_err_msg} />
      <Content data={data} err_msg={err_msg} />
    </div>
  );
}

export default App;
