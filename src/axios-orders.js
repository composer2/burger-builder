import axios from 'axios'

const instance = axios.create({
     baseURL: 'https://burger-builder-a-z.firebaseio.com/'
})

export default instance;