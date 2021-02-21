import React from 'react';

const Button = ({option,checkAnswer,userAnswer,corrAnswer,btnClicked,useranswer}) => {


 /*  value={option}
   onClick={checkAnswer}
   className={`btn-question 
   ${userAnswer===option ? "selected":null}
   ${corrAnswer===.userAnswer && btnClicked ? "right-btn":null}
     		`}
*/ 
 return (
    <div>
    <button 
    onClick={checkAnswer}
    className={`btn-question
    ${useranswer===option ? "selected":null}
    `}
    value={option}>
    { option}
    </button>
    </div>
  )
}

export default Button;