import { getData } from "./reduxFetch";
const jwt = require('jsonwebtoken');

export const userPostFetch = user => {
    return dispatch => {
      return getData("/api/users/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(user)
      },(data) => { 
             if(data.success) {
               localStorage.setItem("token", data.token)
               dispatch(loginUser(data))
            }else{
              localStorage.removeItem("token")
            }  
      }) 
    }
  }

  export const userLoginFetch = user => {
    return dispatch => {
      return getData("/api/users/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(user)
      },(data) => { 
             if(data.success===true) {
               console.log("data",data)
               localStorage.setItem("token", data.token)
               dispatch(loginUser(data))
            }else{
              console.log("data",data)
              localStorage.removeItem("token")
              console.log(data.msg);
            }  
      })   
    }
  }
export const gmailLoginFetch = userData => {
  return dispatch => {
    getData(
      "/logged",
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json"
        }
      },
      (data) => { 
        if(data.success===true) {
          console.log("data",data)
          localStorage.setItem("token", data.token)
          dispatch(loginUser(data))
       }else{
         console.log("data",data)
         localStorage.removeItem("token")
         console.log(data.msg);
       }  
  }
    );
  
  }
 
}
  export const getUserFetch = () => {
    return dispatch => {
      const token = localStorage.token;
      if (token) {
        return getData("/api/users/login", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
          }
        },(data) => { 
             if(data.success===true) {
               localStorage.setItem("token", data.token)
               dispatch(loginUser(data))
            }else{
              localStorage.removeItem("token")
              console.log(data.msg);
            }  
      })  
      }
    }
  }
  
  const loginUser = data => ({
      type: 'LOGIN_USER',
      payload: jwt.decode(data.token),
      logged: data.logged,
      created: data.created,
  })

//   const createUser = data => ({
//     type: 'CREATE_USER',
//     payload: {},
//     logged: data.logged,
//     created: data.created,
// })