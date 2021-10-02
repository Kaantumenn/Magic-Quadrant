import React from 'react';
import {dataType} from "./Graph";
import '../App.css';

export type objectType = {
        id: number,
        label: string,
        vision: number,
        ability: number
}

function Table(props: dataType) {
    function addRow(){
        props.setData([...props.data, {id:props.data[props.data.length-1].id+1, label:"New", vision:50, ability:50}]);
    }

    function deleteRow(id: number){
        let newState = []
        for(let i=0;i<props.data.length; i++){
            if(props.data[i].id !== id) newState.push(props.data[i])
        }
        props.setData(newState)
    }

    function changeRow(row: objectType, id: number){
        let newState = []
        for(let i=0;i<props.data.length; i++){
            if(props.data[i].id !== id) newState.push(props.data[i])
            else newState.push(row)
        }
        props.setData(newState)
    }

  return (
    <div>
      <table>
          <tr>
              <td><button className="Buttons" style={{marginRight:"60%"}} onClick={()=> {addRow()}}>Add</button></td>
          </tr>
          <tr>
          <th className="Table-Labels">Label</th>
          <th className="Table-Labels">Vision</th>
          <th className="Table-Labels">Ability</th>
          <th className="Table-Labels">Delete</th>
      </tr>
          {props.data.map((row:objectType) => {
              return(
                  <tr key={row.id}>
                      <td><input className="Input" type='string' value={row.label} onChange={e => {changeRow({...row, label: e.target.value}, row.id)}}/></td>
                      <td><input className="Input" type='number' min={0} max={100} value={row.vision} onChange={e => {changeRow({...row, vision: Number(e.target.value)}, row.id)}}/></td>
                      <td><input className="Input" type='number' min={0} max={100} value={row.ability} onChange={e => {changeRow({...row, ability: Number(e.target.value)}, row.id)}}/></td>
                      <td><button className="Buttons" onClick={() => {deleteRow(row.id)}}>Delete</button></td>
                  </tr>
              )
          })}
      </table>

    </div>
  );
}

export default Table;
