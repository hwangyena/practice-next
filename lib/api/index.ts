import axios from "axios"

const path = 'https://gorest.co.in/public';

export const getFetch = async (url: string)=>{
  const res = await axios.get(`${path}${url}`);

  // SUCCESS
  if(Math.floor(res.status / 100) ===2){
      return res.data;
  }

  const error:FetchErrorType = {
      status: res.status,
      statusText: res.statusText,
      code: 'Error',
      isFetchError: true,
  };
  
  return alert('error');
}