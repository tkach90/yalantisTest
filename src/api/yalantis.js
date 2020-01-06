import axios from 'axios';

// export default axios.create({
//     baseURL: 'https://yalantis-react-school.herokuapp.com/api/task0/users',
// });

axios({
    method: 'get',
    url: 'https://yalantis-react-school.herokuapp.com/api/task0/users',
}).then(function(response) {
    return response.data;
});