export const getQuestionsCall = () => (
    fetch('http://localhost:3000/api/questions')
        .then(response => response.json())
        .catch(error => console.log(error))
);

// TODO: GET RANDOM QUESTION!
export const getRandomQuestionCall = () => (
    fetch('http://localhost:3000/api/questions/random')
        .then(response => response.json())
        .catch(error => console.log(error))
);

export const getQuestionCall = id => (
    fetch(`http://localhost:3000/api/questions/${id}`)
        .then(response => response.json())
        .catch(error => console.log(error))
);

export const addQuestionCall = question => (
    fetch('http://localhost:3000/api/questions', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(question)
    })
        .then(response => console.log(response))
        .catch(error => console.log(error))
);

// TODO: Send answer!
export const sendAnswerCall = () => (
    fetch()
        .then(response => response.json())
        .catch(error => console.log(error))
);