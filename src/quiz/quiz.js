import React,{useState,useEffect,useCallback} from 'react';
import './quiz.css';
//import Question from './question';
import Answers from './answer';
import Button  from './button';
import CategoriesInfo from './categoriesId';

const Quiz = (props) => {

const[start,setStart]=useState("on");
const[restart,setRestart]=useState("on");
const[score,setScore]=useState(0);
const [error, setError] = useState("")
const[dataArray,setDataArray]=useState([]);
const[question,setQuestion]=useState("");
const[corrAnswer,setCorrAnswer]=useState("");
const[incorrAnswer,setIncorrAnswer]=useState([]);
const[index,setIndex]=useState(0);
const[nextbtn,setNextbtn]=useState(true);
const[prevbtn,setPrevbtn]=useState(false);
const[userAnswer,setUserAnswer]=useState("");
const[categoryId,setCategoryId]=useState(9);
const[totalQuestions,setTotalQuestions]=useState(10);
const[difficulty,setDifficulty]=useState("easy");
const[gameOver,setGameOver]=useState("off");

//-----------------------------------
 const fetchApi=useCallback(() => {

	 fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&category=${categoryId}&difficulty=${difficulty}`)
	.then( res =>res.json())
	.then(data=>{
    setDataArray(data.results)
    setQuestion(data.results[0].question)
    setCorrAnswer(data.results[0].correct_answer)
    setIncorrAnswer(data.results[0].incorrect_answers)
})
  .catch(function(){
    setError("error")
  })
},[totalQuestions,categoryId,difficulty])

//----------------------------------------------------
useEffect(()=>{
 fetchApi()
},[fetchApi])
//categoryId,difficulty,totalQuestions

//---------------------------------------
const StartBtn=()=>{
	 setStart("off")
	 setGameOver("off")
	 setIndex(0)
	 setRestart("off")
      	
}
//-------------------------------------------------

const nextQuestion=()=>{
  setIndex(index+1); 
  setQuestion(dataArray[index+1].question);
  setCorrAnswer(dataArray[index+1].correct_answer);
  setIncorrAnswer(dataArray[index+1].incorrect_answers);
  index===totalQuestions-2 && setNextbtn(false);
  setPrevbtn(true)

}
//------------------------------------------
const prevQuestion=()=>{
   index<totalQuestions && setIndex(index-1); 
   index<=totalQuestions && setQuestion(dataArray[index-1].question);
   index<=totalQuestions &&  setCorrAnswer(dataArray[index-1].correct_answer);
   index<=totalQuestions && setIncorrAnswer(dataArray[index-1].incorrect_answers);
   index===1 &&setPrevbtn(false)
   index<=totalQuestions-1 && setNextbtn(true)
}

//------------------------
const restartBtn=()=>{
	setStart("on")
	setGameOver("on")
	setRestart("on")
}
//--------------------
const finishBtn=()=>{
setGameOver("on")
setStart("on")
setIndex(0)
setRestart("off")
}
//----------------------------------
const raqam=index+1
 const allAnswer=[...incorrAnswer,corrAnswer]
  

  if(allAnswer.length>0){
  	allAnswer.sort() 
 	
  }

//--------------------------
const checkAnswer=(e)=>{
	setUserAnswer(e.target.value);
    e.target.value===corrAnswer && setScore(score+1)
	
	}
//-------------------------------------------------
	const optionId=(e)=>{
    setCategoryId(e.target.value)
   // CategoriesInfo[categoryId] !== undefined && fetchApi();

	}
	//-----------------------------------
	const DifficultyBtn=(e)=>{
     setDifficulty(e.target.value)
	}

	const totalQuestionClick=(e)=>{
  setTotalQuestions(e.target.value)
	}
	
//-------------------------------------------

  return (
    <div className="quiz-app">

    <h1  className="quiz-title">REACT QUIZ:</h1>
   
      { start==="on" ?
    <div className="select-start">
    <select
    onClick={optionId}
    className="select">
    <option value={categoryId}>Choose the category</option>
    {CategoriesInfo.map(ind=>
     <option key={ind.id} 
     value={ind.id}
     >
     {ind.name}</option>

    )}
    </select>

         <input
         onClick={totalQuestionClick}
         type="number"
         min="1"
         defaultValue={totalQuestions}
     className="total_question_btn"
      placeholder="Number of question"/>

      <select
       className="diff"
       onClick={DifficultyBtn}
      >
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
      </select>  
       <button 
     onClick={StartBtn}className="start-btn">
      Start</button>
      </div>:null}
      

   { gameOver ==="on" && restart==="off" ? 
   <div>
   <h1 className="game-over">Game Over</h1>
   <p className="totalscore">Your Score is : {score} from {totalQuestions}</p>
   </div>:null}


      {start==="off" && gameOver==="off" &&
     <div>
   
    <p className="score">Score: {score}</p>
    <div className="quiz-container">
     <div className="question-container">
      <Answers
      key={question}
     question={question}
     index={raqam}
     totalQuestions={totalQuestions} 
    />
    {error ? <h1>error</h1>
      :allAnswer.map((option,i)=>
     	<Button
     	key={i}
     	useranswer={userAnswer}
     	corranswer={corrAnswer}
     	checkanswer={checkAnswer}
     	option={option}
      
 
        />  )}
   
     </div>
     </div>
       { nextbtn ? <button className="bottom-btn"
     onClick={nextQuestion}
     >Next question</button>:null}

     {prevbtn ? <button className="bottom-btn"
     onClick={prevQuestion}

     >Prev question</button>:null} 
     <button className="bottom-btn"
     onClick={restartBtn}
     >Restart</button>
     <button className="bottom-btn"
     onClick={finishBtn}
     >Finish</button>

    </div>}

    </div>
  )
    
    }


export default Quiz;
