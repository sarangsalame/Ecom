import axios from "axios";

export const getAxiosRequest = (url:string)=>{
    const jsonString: any = localStorage.getItem("accessToken");
    const accessToken = JSON.parse(jsonString)
    axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => response)           
            .catch(err => err)
}