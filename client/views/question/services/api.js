import Auth from '../../login/actions/Auth';

const API_path = 'http://localhost:3000/api';

const post_headers = {
    headers: {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + Auth.accessToken(),
    },
    method: 'POST',
};

const get_headers = {
    headers: {
        'Authorization': 'Bearer ' + Auth.accessToken(),
    },
    method: 'GET',
};

export const getQuestionsCall = () => (
    fetch(`${API_path}/questions/answered`, { ...get_headers })
        .then(response => response.json())
        .catch(error => console.log(error))
);

export const getRandomQuestionCall = () => (
    fetch(`${API_path}/questions/random`, { ...get_headers })
        .then(response => response.json())
        .catch(error => console.log(error))
);

//TODO(Aron) Currently not used. Remove?
export const getQuestionCall = id => (
    fetch(`${API_path}/questions/${id}`, { ...get_headers })
        .then(response => response.json())
        .catch(error => console.log(error))
);

export const addQuestionCall = question => (
    fetch(`${API_path}/questions`, {
        ...post_headers,
        body: JSON.stringify(question)
    })
        .then(response => console.log(response))
        .catch(error => console.log(error))
);

export const sendAnswerCall = (questionId, optionsIdx) => (
    fetch(`${API_path}/questions/${questionId}/answers/`, {
        ...post_headers,
        body: JSON.stringify({
            answer: {
                option: optionsIdx
            }
        })
    })
        .then(response => response.json())
        .catch(error => console.log(error))
);