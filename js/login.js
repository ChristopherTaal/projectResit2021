import { loginUrl } from "./settings/api.js";

// LOGIN //
// make the request to the login endpoint
const button_login = document.getElementById("login_btn_id");
button_login.addEventListener('click', function(e){
    // auto submission of the form 
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    const userElement = document.getElementById('username');
    const passwordElement = document.getElementById('password');
    const tokenElement = document.getElementById('token');
    const user = userElement.value;
    const password = passwordElement.value;
  
    xhr.open('POST', loginUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.addEventListener('load', function() {
      const responseObject = JSON.parse(this.response);
      // console.log(responseObject);
      if (responseObject.token) {
        // console.log();
        localStorage.setItem('token', responseObject.token);
        window.location.replace("http://localhost:8000/index.html");
        // tokenElement.innerHTML = responseObject.token;
      } else {
        tokenElement.innerHTML = "No token received";
      }
    });
    
   
    const sendObject = JSON.stringify({username: user, password: password});
  
    console.log('going to send', sendObject);
    
    xhr.send(sendObject);

});