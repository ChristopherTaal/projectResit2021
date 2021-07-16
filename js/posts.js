import { postsUrl } from "./settings/api.js";

//GET ALL POSTS//
const wordpressUrlPosts = postsUrl;
const wordpressCoverBox = document.querySelector(".wordpressCover");
const logintBtnDibv = document.getElementsByClassName("loginBtnClass")[0];
const logouttBtnDibv = document.getElementsByClassName("logoutBtnClass")[0];

const response = await fetch (wordpressUrlPosts);
const json = await response.json();

    const tok = localStorage.getItem('token');
    logintBtnDibv.style.visibility = "visible";
    logouttBtnDibv.style.visibility = "visible";
    if(tok != null) {
        // console.log(tok);
        if (logintBtnDibv != null){
            logintBtnDibv.style.visibility = "hidden";
        }
    }else {
        console.log("no token");
        logouttBtnDibv.style.visibility = "hidden"
    }

window.logout = function logout() {

    localStorage.clear();
    window.location.replace("http://localhost:8000/index.html");
}

window.deletePost = function deletePost(id) {
    console.log('delete');

    
    const url_string = postsUrl + id
    console.log(url_string);
    $.ajax({
        url: url_string,
        type: "delete",
        headers: { "Authorization": 'Bearer ' + tok },
        contentType: "application/json",
        error: function(err) {
          alert('please Login');
          switch (err.status) {
            
            case "400":
              // bad request
              break;
            case "401":
              // unauthorized
              break;
            case "403":
              // forbidden
              
              break;
            default:
              //Something bad happened
              break;
          }
        },
        success: function(data) {
          console.log("Success!");
          window.location.replace("http://localhost:8000/index.html");
        }
      });

    
}

window.addPost = function addPost() {

    const title = document.getElementById('title').value
    const content = document.getElementById('content').value

    $.ajax({
        url: postsUrl,
        type: "POST",
        headers: { "Authorization": 'Bearer ' + tok },
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            "title": title,
            "content": content,
            "status": "publish",
        }),
        error: function(err) {
          switch (err.status) {
            case "400":
              // bad request
              break;
            case "401":
              // unauthorized
              break;
            case "403":
              // forbidden
              break;
            default:
              //Something bad happened
              break;
          }
        },
        success: function(data) {
          console.log("Success!");
          window.location.replace("http://localhost:8000/index.html");
        }
      });

}
window.editPost = function editPost() {
    console.log('Edit Post');

    const id_edit = localStorage.getItem('id_edit');
    console.log(id_edit);

    const url_string = postsUrl + id_edit
    console.log(url_string);
    // console.log(content);
    const title = document.getElementById('title').value
    const content = document.getElementById('content').value
    console.log(title);
    console.log(content);
  
    $.ajax({
        url: url_string,
        type: "PUT",
        headers: { "Authorization": 'Bearer ' + tok },
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            "title": title,
            "content": content,
            "status": "publish",
        }),
        error: function(err) {
          switch (err.status) {
            case "400":
              // bad request
              break;
            case "401":
              // unauthorized
              break;
            case "403":
              // forbidden
              break;
            default:
              //Something bad happened
              break;
          }
        },
        success: function(data) {
          console.log("Success!");
          window.location.replace("http://localhost:8000/index.html");
        }
      });

} 
window.editPostRedirect = function editPostRedirect(id) {
    console.log('Edit Post');
    if (tok == null){
      alert('please login');
    }else {
      localStorage.setItem('id_edit', id);
      window.location.replace("http://localhost:8000/editpost.html");
    }


} 


// json.forEach(function (wordpress) {

//     wordpressCoverBox.innerHTML += `<div class="slug"> ${wordpress.slug}
//     </div>
//     <p>${wordpress.id}</p>
//     <p>${wordpress.title.rendered}</p>
//     <p>${wordpress.status}</p>
//     <p>${wordpress.date}</p>
//     <p>${wordpress.content.rendered}</p>
//     <div class="logoutBtnClass"> 
   
//         <button onclick='editPostRedirect(${wordpress.id});' > Edit </button>
//         <button onclick='deletePost(${wordpress.id});'> Delete </button>
//     </div>
//     </div>`
 
// });


const postsList = document.getElementById('postList');
const searchBar = document.getElementById('searchBar');
let posts = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    let filteredPosts = [];
    for (let i = 0; i < posts.length; i++) {
   
      if(posts[i].title.rendered.toLowerCase().includes(searchString)) {
        filteredPosts.push(posts[i])
      }
    }
    if (searchString == ''){
      displayPosts(posts);
    }else{
      displayPosts(filteredPosts);
    }
    
});

const loadPosts = async () => {
    try {
        const res = await fetch(postsUrl);
        posts = await res.json();
        displayPosts(posts);
    } catch (err) {
        console.error(err);
    }
};

const displayPosts = (posts) => {
    const htmlString = posts
        .map((posts) => {
            return `
            <li class="character">
         

                <h1>${posts.title.rendered}</h1>

                <p>${posts.date}</p>
                <p>${posts.content.rendered}</p>
                        <button onclick='editPostRedirect(${posts.id});' > Edit </button>
        <button onclick='deletePost(${posts.id});'> Delete </button>
            </li>
        `;
        })
        .join('');
    postsList.innerHTML = htmlString;
};

loadPosts();
