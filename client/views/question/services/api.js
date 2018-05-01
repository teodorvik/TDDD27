export const fetchQuestions = () => (
    fetch('http://localhost:3000/api/questions')
        .then(response => response.json())
        .catch(error => console.log(error))
)

export const fetchQuestion = id => (
    fetch(`http://localhost:3000/api/questions/${id}`)
        .then(response => response.json())
        .catch(error => console.log(error))
)