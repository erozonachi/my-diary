/**
 * 
 * @author: Eneh, James 
 */

$( document ).ready ( function () {

  function makeToast (message) {
    $("#toast").html(message);
    $("#toast").addClass("show");
    setTimeout(function(){ $("#toast").removeClass("show") }, 3000);
  }

  $("#signUpForm").on("submit", function () {
    const username = $("#username").val().trim()
    const alphaNum = /^[a-z0-9]+$/i;
    if (username == "") {
      makeToast("Username is required");
      return false;
    } else if (!alphaNum.test(username)) {
      makeToast("Username can only contain letters and number");
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
    } else if (/^[a-z]+$/i.test(password) || /^[0-9]+$/i.test(password)) {
      makeToast("Weak password: mix letters, numbers, and special characters");
      return false;
    } else if ($("#confirm").val() != password) {
      makeToast("Password and confirm password not match");
      return false;
    }
    $("#btnSignUp").html('<i class="fa fa-spinner fa-spin"></i> Wait');
    //http request
    //demo
    setTimeout(function(){ $("#btnSignUp").html("Sign Up"); makeToast("Form submitted!"); }, 5000);
  });

  $("#signInForm").on("submit", function() {
    const username = $("#username").val();
    if($("#username").val().trim() == "") {
      makeToast("Username is required");
      return false;
    }
    if($("#password").val() == "") {
      makeToast("Password is required");
      return false;
    }

    $("#btnSignIn").html('<i class="fa fa-spinner fa-spin"></i> Authenticating');
    //http request
    //demo
    setTimeout(function(){ $("#btnSignIn").html('<i class="fa fa-lock"></i> Sign In'); window.location.replace("user/dashboard.html") }, 5000);

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

    $("#submit").html('<i class="fa fa-spinner fa-spin"></i> Wait');
    if ($("#submit").val() == "add") {
      //http POST request to add new entry
      //demo
      setTimeout(function(){ $("#submit").html('<i class="fa fa-save"></i> Add Entry'); makeToast("Entry added successfully"); }, 5000);
    } else {
      //http PUT request to modify entry
      //demo
      setTimeout(function(){ $("#submit").html('<i class="fa fa-save"></i> Save Changes'); makeToast("Entry updated successfully"); }, 5000);
    }
  });

  $("#searchForm").on("submit", function () {
    if ($("#mySearch").val().trim() != "") {
      //http GET request to search entry data-store
      //demo
      $("#btnSearch").html('<i class="fa fa-spinner fa-spin"></i>');
      setTimeout(function(){ $("#btnSearch").html('<i class="fa fa-search"></i>'); }, 5000);
    }
  });

  $("#picForm").on("submit", function () {
    if ($("#profilePic").val().trim == "") {
      makeToast("Image is required");
      return false;
    }

    $("#savePic").html('<i class="fa fa-spinner fa-spin"></i>');
    setTimeout(function(){ $("#savePic").html('<i class="fa fa-save"></i> Save'); }, 5000);
  });

});

function toggleMenu(X) {
  X.classList.toggle("change");
  var x = document.getElementById("nav");
  if (x.className === "nav") {
      x.className += " responsive";
  } else {
      x.className = "nav";
  }
}