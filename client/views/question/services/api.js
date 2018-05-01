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

export const addQuestion = (question) => (
    fetch('http://localhost:3000/api/questions', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(question)
    })
        .then(response => console.log(response))
        .catch(error => console.log(error))
)
