import React,{Fragment} from 'react';
   
    const Answers = ({index,totalQuestions,question})=>{

      return (
    <Fragment>
       <p className="number">{index}/{totalQuestions}</p>
       <p className="question">{question}</p>
   
    </Fragment>
  )
}

export default Answers;