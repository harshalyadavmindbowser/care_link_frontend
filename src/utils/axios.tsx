import axios from "axios";


const axiosInstance= axios.create({baseURL:'http://localhost:8080'});


axiosInstance.interceptors.response.use(
    (response)=>response,
    (err)=>Promise.reject((err.response && err.response.data || `Something went wrong`))
); 

export default axiosInstance;