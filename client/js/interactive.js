/**
 * 
 * @author: Eneh, James 
 */
const base_url = 'http://localhost:8000/api/v1/users';
$( document ).ready(function() {
function makeToast (message) {
    $("#toast").html(message);
    $("#toast").addClass("show");
    setTimeout(function(){ $("#toast").removeClass("show") }, 4000);
  }

  const signIn = function() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const btnLogin = document.getElementById('btnSignIn');
    if(username.value.trim() == "") {
      makeToast("Username is required");
      return false;
    }
    if(password.value.trim() == "") {
      makeToast("Password is required");
      return false;
    }

    btnLogin.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Authenticating';
    //http request
    const payload = {
      username: username.value,
      password: password.value
    };
    const url = `${base_url}/auth/login`;
    let fetchData = { 
      method: 'POST', 
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    };

    fetch(url, fetchData)
    .then((resp) => resp.json(), (error) => {
      console.error(error);
      makeToast('Sign in cannot be completed at this time! Try again');
      btnLogin.innerHTML = 'Sign In';
    })
    .then((data) => {
      if (data.status == 'success') {
        btnLogin.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Redirecting...';
        sessionStorage.setItem('userId', data.data.id);
        sessionStorage.setItem('fullName', data.data.name);
        sessionStorage.setItem('email', data.data.email);
        sessionStorage.setItem('token', data.data.accessToken);
        console.log(data);
        window.location.replace("dashboard.html");
      } else {
        makeToast(data.message);
        btnLogin.innerHTML = 'Sign In';
        console.log(data);
      }
    }, (error) => {
      btnLogin.innerHTML = 'Sign In';
      makeToast('Sign in cannot be completed at this time! Try again');
      console.error(error);
    })
    .catch ((error) => {
      btnLogin.innerHTML = 'Sign In';
      makeToast('Unable to sign in, try again');
      console.error(error);
    });

  }

  $("#signUpForm").on("submit", function () {
    const username = $("#username").val().trim()
    const nameFormat = /^[a-zA-Z]+$/i;
    const alphaNum = /^[a-zA-Z0-9]+$/i;
    if ($("#fName").val().trim() == "") {
      makeToast("First Name is required");
      return false;
    } else if (!nameFormat.test($("#fName").val().trim())) {
      makeToast("First Name can only contain letters");
      return false;
    }
    if ($("#lName").val().trim() == "") {
      makeToast("Last Name is required");
      return false;
    } else if (!nameFormat.test($("#lName").val().trim())) {
      makeToast("Last Name can only contain letters");
      return false;
    }
    if (username == "") {
      makeToast("Username is required");
      return false;
    } else if (!alphaNum.test(username)) {
      makeToast("Username can only contain letters and digits");
      return false;
    } else if (!isNaN(username.charAt(0))) {
      makeToast("Username cannot start with a number");
      return false;
    }
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = $("#email").val().trim()
    if(email == "") {
      makeToast("Email is required");
      return false;
    } else if (!emailRegEx.test(email)) {
      makeToast("Invalid email format");
      return false;
    }
    const password = $("#password").val();
    if (password.length < 10) {
      makeToast("Password not up to 10 characters");
      return false;
    } else if (/^[a-zA-Z]+$/i.test(password) || /^[0-9]+$/i.test(password)) {
      makeToast("Weak password: mix letters, numbers, and special characters");
      return false;
    } else if ($("#confirm").val() != password) {
      makeToast("Password and confirm password not match");
      return false;
    }
    $("#btnSignUp").html('<i class="fa fa-spinner fa-spin"></i> Wait');
    //http request
    const payload = {
      firstName: $("#fName").val(),
      lastName: $("#lName").val(),
      username: $("#username").val(),
      email: $("#email").val(),
      password: $("#password").val()
    };

    const url = `${base_url}/auth/signup`;
    console.log(payload);
    let fetchData = { 
      method: 'POST', 
      body: JSON.stringify(payload),
      headers: {
          "Content-Type": "application/json; charset=utf-8"
      }
    };

    fetch(url, fetchData)
    .then((resp) => resp.json(), (error) => {
      console.log(resp);
      console.error(error);
      makeToast('SignUp cannot be completed at this time! Try again');
    })
    .then((data) => {
      //const res = JSON.parse(data);
      if (data.status == 'success') {
        console.log(data);
        $("#btnSignUp").html('<i class="fa fa-spinner fa-spin"></i> Redirecting...');
        makeToast('Sign up successful!');
        window.location.replace("signin.html")
      } else {
        console.log(data);
        makeToast(data.message);
        $("#btnSignUp").html('Sign Up');
      }
      //return data;
    }, (error) => {
      console.error(error);
      makeToast('SignUp cannot be completed at this time! Try again');
      $("#btnSignUp").html('Sign Up');
    })
    .catch ((error) => {
      console.error(error);
      makeToast('Unable to sign up, try again');
      $("#btnSignUp").html('Sign Up');
    });
  });

  $("#entryForm").on("submit", function () {
    if ($("#title").val().trim() == "") {
      makeToast("Entry title is required");
      return false;
    } else if ($("#title").val().length > 50) {
      makeToast("Title: Max length of 50 exceeded");
      return false;
    }

    if ($("#desc").val().trim() == "") {
      makeToast("Entry description is required");
      return false;
    }
    const payload = {
      title: $("#title").val(),
      content: $("#desc").val(),
      conclusion: $("#conclude").val(),
    }
    $("#submit").html('<i class="fa fa-spinner fa-spin"></i> Wait');
    if ($("#submit").val() == "add") {
      //http POST request to add new entry
      const url = `${base_url}/${sessionStorage.userId}/entries`;
      let fetchData = { 
        method: 'POST', 
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-access-token": sessionStorage.token,
        }
      };

      fetch(url, fetchData)
      .then((resp) => resp.json(), (error) => {
        $("#submit").html('<i class="fa fa-save"></i>&nbsp;Add Entry');
        makeToast('Add entry cannot be completed at this time! Try again');
        console.error(error);
      })
      .then((data) => {
        if (data.status == 'success') {
          $("#submit").html('<i class="fa fa-save"></i>&nbsp;Add Entry');
          makeToast(data.message);
          fetchAllEntries();
          console.log(data);
        } else {
          $("#submit").html('<i class="fa fa-save"></i>&nbsp;Add Entry');
          makeToast(data.message);
          console.log(data);
        }
      }, (error) => {
        $("#submit").html('<i class="fa fa-save"></i>&nbsp;Add Entry');
        makeToast('Add entry cannot be completed at this time! Try again');
        console.error(error);
      })
      .catch ((error) => {
        $("#submit").html('<i class="fa fa-save"></i>&nbsp;Add Entry');
        makeToast('Unable to add entry, try again');
        console.error(error);
      });
    } else {
      //http PUT request to modify entry
      const url = `${base_url}/${sessionStorage.userId}/entries`;
      let fetchData = { 
        method: 'PUT', 
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-access-token": sessionStorage.token,
        }
      };

      fetch(url, fetchData)
      .then((resp) => resp.json(), (error) => {
        $("#submit").html('<i class="fa fa-save"></i>&nbsp;Save Changes');
        makeToast('Modify entry cannot be completed at this time! Try again');
        console.error(error);
      })
      .then((data) => {
        if (data.status == 'success') {
          $("#submit").html('<i class="fa fa-save"></i>&nbsp;Save Changes');
          makeToast(data.message);
          fetchAllEntries();
          console.log(data);
        } else {
          $("#submit").html('<i class="fa fa-save"></i>&nbsp;Save Changes');
          makeToast(data.message);
          console.log(data);
        }
      }, (error) => {
        $("#submit").html('<i class="fa fa-save"></i>&nbsp;Save Changes');
        makeToast('Modify entry cannot be completed at this time! Try again');
        console.error(error);
      })
      .catch ((error) => {
        $("#submit").html('<i class="fa fa-save"></i>&nbsp;Save Changes');
        makeToast('Unable to modify entry, try again');
        console.error(error);
      });
    }
  });

});

function toggleMenu(X) {
  X.classList.toggle("change");
  const x = document.getElementById("nav");
  if (x.className === "nav") {
      x.className += " responsive";
  } else {
      x.className = "nav";
  }
}
