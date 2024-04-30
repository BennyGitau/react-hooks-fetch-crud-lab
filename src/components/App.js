import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])
 useEffect(()=>{
  fetch(`http://localhost:4000/questions`)
  .then(res => res.json())
  .then(data => {
    setQuestions(data)
  })
 },[])
 function tohandleDelete(id){
  const updatedItems = questions.filter((question)=> question.id !== id)
  setQuestions(updatedItems)
  }
  function handleUpdateQuestion(updatedItem){
    const updatedItems = questions.map((question)=> {
      if(question.id === updatedItem.id){
        return updatedItem
      } else {
        return question;
      }
    })
    setQuestions(updatedItems)
  }

 function handleQuestionAdd(newQuestion){
 setQuestions([...questions, newQuestion])
  
 }

  

 
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addQuestion={handleQuestionAdd}/> : 
      <QuestionList handleDelete={tohandleDelete} questions={questions} handlePatch={handleUpdateQuestion}/>}
    </main>
  );
}

export default App;
