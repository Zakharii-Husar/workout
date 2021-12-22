import React, { useState, useEffect } from 'react';
import './Exercises.css';
import ExercisesList from './ExercisesList';
import {musclesGroups} from './data';
import {icons} from './data';



function Exercises(props) {

  const [visibleExercises, setVisibleExercises] = useState([]);
  const [addedToProgram, setAddedToProgram] = useState([]);

  useEffect(()=>{
    props.passAddedExercises(addedToProgram)
  }, [addedToProgram])

return (
<div style={props.exercisesVisibility} className="exercises">
 <div className="chosenExercisesContainer">
    <div className="chosenExercise">
      {props.chosenExercises.map((exercise) => {
        return(
            <img src={exercise.img}/>
        )
      })}

    </div>

    <button className="correctBtn" 
    onClick={()=>setAddedToProgram(props.chosenExercises.filter((e, i)=>{ 
  return i !== props.chosenExercises.length -1}))}
   style={props.chosenExercises.length > 0 ? 
   {display: "flex"} : 
   {display: "none"}}>Correct</button>
 </div>


    {musclesGroups.map((muscle, muscleIndex) =>{

                const toggleExercisesVisibility = (e) =>{
                  if(!visibleExercises.includes(muscleIndex)){
                    setVisibleExercises([...visibleExercises, muscleIndex]);
                  }else{
                  setVisibleExercises(visibleExercises.filter((current)=> current !== muscleIndex));
                  }
                };
                
      return(
        <>
        <div className="exerciseslist">
          <img className="icon1" src={muscle.img}/>
          <div id="muscleName" className="name">{muscle.name}</div>
          <img src={icons.arrow} className="icon2"
          onClick={toggleExercisesVisibility}/>
        </div>
        
            <ExercisesList
              style={visibleExercises.includes(muscleIndex) ?
              {display: "flex", opacity: 1} :
              {display: "none", opacity: 0}}
              arr={muscle.exercises}
              icon1={"exercise"}
              icon2={"add"}
              action1 = {()=>{}}
              action2={exercise => setAddedToProgram([...addedToProgram, exercise])}/>
        </>
      )
    })}

    <div className="controlButtons">
    <img src={icons.remove} onClick={()=>{setAddedToProgram([]); 
      props.showCreateProgram()}}/>
      <img src={icons.check} onClick={props.showCreateProgram}/>
    </div>
    </div>
  );
}

export default Exercises;