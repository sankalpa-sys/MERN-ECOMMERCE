import axios from "axios";

const BASE_URL = 'http://localhost:8001/api/';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDdkN2M3ZmI4N2E1MzE1ODRlZTI5YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTkwMTM1OSwiZXhwIjoxNjQyMTYwNTU5fQ.vTaiRMuu2Q9hZKJSbQwUyLeHjCgWEoBcH5ZIcMzvWs0'
export const publicRequest = axios.create({
    baseURL: BASE_URL
})
export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token: TOKEN}
})