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

  function drop(e: any) {
    e.preventDefault();
    if(e.clientX > 475 || e.clientY > 475 ) return
    console.log(e.clientX,e.clientY)
    const leftSide = Math.floor(e.clientX * 100 / 475)
    const bottomSide = Math.floor(100 - (e.clientY * 100 / 475))

    changeRow({...currentData, vision: leftSide, ability: bottomSide}, currentData.id)

  }

  function dragEnter(e: any, row: objectType) {
    e.preventDefault();
    setCurrentData(row)
  }

  return (
    <div>
      <div style={{width: 500, height: 500, border: "2px solid black"}} onDrop={e => {drop(e)}} onDragEnd={e => {drop(e)}}>
        <div className="Graph-Labels" style={{border: "2px solid lightgrey", position:"absolute", top: 250, width:495}}/>
        <div className="Graph-Labels" style={{border: "2px solid lightgrey", position:"absolute", top: 250, width:495, transform:"rotate(90deg)"}}/>
        <div className="Graph-Labels" style={{marginLeft:75}}>Challengers</div>
        <div className="Graph-Labels" style={{marginLeft:350}}>Leaders</div>
        <div className="Graph-Labels" style={{marginLeft:75,top:470}}>Niche Players</div>
        <div className="Graph-Labels" style={{marginLeft:350,top:470}}>Visionaries</div>
        <div style={{transform:"rotate(270deg)", position:"absolute", marginLeft:450,top:420}}>Ability to Execute -&#62; </div>
        <div style={{position:"absolute",marginLeft:300,top:510}}>&#60;- Completeness of Vision </div>
        {props.data.map((row: objectType) => {
          const leftSide = Math.floor(row.vision * 475 / 100)
          const bottomSide = Math.floor(475 - (row.ability * 475 / 100))
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
