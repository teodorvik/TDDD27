const API_path = 'http://localhost:3000/api';
 
export const getQuestionsCall = () => (
    fetch(`${API_path}/questions`)
        .then(response => response.json())
        .catch(error => console.log(error))
);

export const getRandomQuestionCall = () => (
    fetch(`${API_path}/questions/random`)
        .then(response => response.json())
        .catch(error => console.log(error))
);

export const getQuestionCall = id => (
    fetch(`${API_path}/questions/${id}`)
        .then(response => response.json())
        .catch(error => console.log(error))
);

export const addQuestionCall = question => (
    fetch(`${API_path}/questions`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(question)
    })
        .then(response => console.log(response))
        .catch(error => console.log(error))
);

export const sendAnswerCall = (questionId, optionsIdx) => (
    fetch(`${API_path}/answers`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ questionId, optionsIdx })
    })
        .then(response => response.json())
        .catch(error => console.log(error))
);