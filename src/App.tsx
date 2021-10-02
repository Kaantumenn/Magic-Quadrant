import React from 'react';
import './App.css';

import Graph from './screens/Graph'
import Table from './screens/Table'

function App() {
    const [data, setData] = React.useState([{id:0, label:"New", vision:50, ability:50}])

  return (
    <div className="App">
        <Graph data={data} setData={setData}/>
        <Table data={data} setData={setData}/>
    </div>
  );
}

export default App;
