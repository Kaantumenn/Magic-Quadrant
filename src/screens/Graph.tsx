import React from 'react';
import {objectType} from "./Table";
import '../App.css';

export type dataType = {data:{
  id: number,
  label: string,
  vision: number,
  ability: number
}[]
setData:  React.Dispatch<React.SetStateAction<{
  id: number,
  label: string,
  vision: number,
  ability: number
}[]>>}

function Graph(props: dataType) {
  const [currentData, setCurrentData] = React.useState({id:0, label:"New", vision:50, ability:50})

  function changeRow(row: objectType, id: number){
    let newState = []
    for(let i=0;i<props.data.length; i++){
      if(props.data[i].id !== id) newState.push(props.data[i])
      else newState.push(row)
    }
    props.setData(newState)
  }

  function dragOver(e: any){
    e.preventDefault();
    if(e.clientX > 375 || e.clientY > 375 ) return
    const leftSide = Math.floor(e.clientX * 100 / 375)
    const bottomSide = Math.floor(100 - (e.clientY * 100 / 375))
    changeRow({...currentData, vision: leftSide, ability: bottomSide}, currentData.id)
  }

  function drop(e: any) {
    e.preventDefault();
    if(e.clientX > 375 || e.clientY > 375 ) return
    const leftSide = Math.floor(e.clientX * 100 / 375)
    const bottomSide = Math.floor(100 - (e.clientY * 100 / 375))
    changeRow({...currentData, vision: leftSide, ability: bottomSide}, currentData.id)

  }

  function dragEnter(e: any, row: objectType) {
    e.preventDefault();
    setCurrentData(row)
  }

  return (
    <div>
      <div style={{width: 400, height: 400, border: "2px solid black"}} onDragOver={e=> {dragOver(e)}} onDrop={e => {drop(e)}} onDragEnd={e => {drop(e)}} >
        <div className="Graph-Labels" style={{border: "2px solid lightgrey", position:"absolute", top: 200, width:395}}/>
        <div className="Graph-Labels" style={{border: "2px solid lightgrey", position:"absolute", top: 200, width:395, transform:"rotate(90deg)"}}/>
        <div className="Graph-Labels" style={{marginLeft:35}}>Challengers</div>
        <div className="Graph-Labels" style={{marginLeft:250}}>Leaders</div>
        <div className="Graph-Labels" style={{marginLeft:35,top:370}}>Niche Players</div>
        <div className="Graph-Labels" style={{marginLeft:250,top:370}}>Visionaries</div>
        <div style={{transform:"rotate(270deg)", position:"absolute", marginLeft:350,top:320}}>Ability to Execute -&#62; </div>
        <div style={{position:"absolute",marginLeft:200,top:410}}>&#60;- Completeness of Vision </div>
        {props.data.map((row: objectType) => {
          const leftSide = Math.floor(row.vision * 375 / 100)
          const bottomSide = Math.floor(375 - (row.ability * 375 / 100))

          return(
              <span key={row.id} className="dot" style={{ height: 25, width: 25, backgroundColor: "#3878A2", borderRadius: "50%",
                display: "inline-block", position: "absolute", left: leftSide, top:bottomSide }}
              draggable={true} onDrop={e => {drop(e)}} onDragEnter={e => {dragEnter(e, row)} }>
                <label className="DotName">{row.label}</label>
              </span>

          )
        })}
      </div>
    </div>
  );
}

export default Graph;
