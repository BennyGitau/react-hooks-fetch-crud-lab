import React from "react";

function QuestionItem({ question, handleDeleteQuestion, onUpdatedItem }) {
  const { id, prompt, answers, correctIndex } = question;
console.log(answers)
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleQuestionUpdate(e){
    const correctIndex= parseInt(e.target.value)
    fetch(`http://localhost:4000/questions/${id}`, {
    method: 'PATCH',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
      correctIndex: correctIndex
    })
  })
  .then((res)=> res.json())
  .then((updatedItem)=> onUpdatedItem(updatedItem))

  }
  function handleDelete(){
    fetch(`http://localhost:4000/questions/${id}`, {
    method: 'DELETE',
  })
  .then(res => res.json())
  .then(() => handleDeleteQuestion(id));
}

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleQuestionUpdate}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
