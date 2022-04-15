import axios from "axios";

// console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.token)


const BASE_URL = "http://localhost:8001/api/";

  const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDdkN2M3ZmI4N2E1MzE1ODRlZTI5YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0OTMwMzMzNX0.nOOThs1rclgiOjRljVF7z5KKp5LopiQ2FnrbGNMOUys"
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: TOKEN },


  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDdkN2M3ZmI4N2E1MzE1ODRlZTI5YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0OTMwMzMzNX0.nOOThs1rclgiOjRljVF7z5KKp5LopiQ2FnrbGNMOUys
});


export const khaltiRequest = axios.create({
  headers: {  "Access-Control-Allow-Origin": '*', }
});