import axiosInstance from "../utils/axios";

function jwtDecode(token: string){
const base64Url = token.split('.')[1];
const base64 =base64Url.replace(/-/g,'+').replace(/_/g,'/');
const jsonPayload= decodeURIComponent(
window.atob(base64).split('').map((c)=> `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`).join('')
);
return JSON.parse(jsonPayload);
}

export const isValidToken=(accessToken: string)=>{
if(!accessToken){
return false;
}
const decoded =jwtDecode(accessToken);
const currentTime = Date.now()/1000;
return decoded.exp> currentTime;
};

export const tokenExpired=(exp: number)=>{
let expiredTimer;
const currenttime= Date.now();
const timeLeft = exp * 1000- currenttime;
clearTimeout(expiredTimer);
expiredTimer = setTimeout(()=>{
alert('Token expired');
localStorage.removeItem('accessToken');
window.location.href='/auth/login';
},timeLeft);
};

export const setSession=(accessToken: string| null)=>{
console.log("accessToken",accessToken);
if(accessToken){
localStorage.setItem('accessToken',accessToken);
axiosInstance.defaults.headers.common.Authorization=`Bearer ${accessToken}`;
const {exp} = jwtDecode(accessToken);
tokenExpired(exp);
}else{
localStorage.removeItem('accessToken');
delete axiosInstance.defaults.headers.common.Authorization;
}
}




