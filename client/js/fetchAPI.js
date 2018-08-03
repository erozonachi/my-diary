function signUp(payload) {
  const url = `${base_url}/auth/signup`;
  /* let data = {
    firstName: "James",
    lastName: "Eneh",
    username: "erozona07",
    email: "james@gmail.com",
    password: "enjd9393md#"
  }; */
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
    alert('SignUp cannot be completed at this time! Try again');
  })
  .then((data) => {
    //const res = JSON.parse(data);
    if (data.status == 'succeeded') {
      console.log(data);
      alert('Sign up successful!');
      window.location.replace("signin.html")
      return '<i class="fa fa-spinner fa-spin"></i> Redirecting...';
    } else {
      console.log(data);
      alert(data.message);
      return 'Sign Up';
    }
    //return data;
  }, (error) => {
    console.error(error);
    alert('SignUp cannot be completed at this time! Try again');
    return 'Sign Up';
  })
  .catch ((error) => {
    console.error(error);
    alert('Unable to sign up, try again');
    return 'Sign Up';
  });
}
function login(payload) {
  const url = `${base_url}/auth/login`;
  let data = {
    loginName: "erozona07",
    loginPassword: "enjd9393md#"
  };
  let fetchData = { 
    method: 'POST', 
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    }
  };

  fetch(url, fetchData)
  .then((resp) => resp.json(), (error) => {
    console.error(error);
    alert('SignUp cannot be completed at this time! Try again');
  })
  .then((data) => {
    if (data.status == 'success') {
      console.log(data);
    } else {
      console.log(data);
    }
  }, (error) => {
    console.error(error);
    alert('SignUp cannot be completed at this time! Try again');
  })
  .catch ((error) => {
    console.error(error);
    alert('Unable to sign up, try again');
  });
}
function newEntry(userID, payload) {
  const url = `${base_url}/${userID}/entries`;
  let data = {
    title: "London Tour",
    description: "I was awesome",
    conclusion: "Good to be here"
  };
  let fetchData = { 
    method: 'POST', 
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-access-token": "jsj894io42-023]32;'ed;ll;][][#'12=2-303]['ds'\/.,d;e"
    }
  };

  fetch(url, fetchData)
  .then((resp) => resp.json(), (error) => {
    console.error(error);
    alert('SignUp cannot be completed at this time! Try again');
  })
  .then((data) => {
    if (data.status == 'success') {
      console.log(data);
    } else {
      console.log(data);
    }
  }, (error) => {
    console.error(error);
    alert('SignUp cannot be completed at this time! Try again');
  })
  .catch ((error) => {
    console.error(error);
    alert('Unable to sign up, try again');
  });
}
function modifyEntry(userID, payload) {
  const url = `${base_url}/${userID}/entries`;
  let data = {
    title: "London Tour",
    description: "I was awesome",
    conclusion: "Good to be here"
  };
  let fetchData = { 
    method: 'PUT', 
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-access-token": "jsj894io42-023]32;'ed;ll;][][#'12=2-303]['ds'\/.,d;e"
    }
  };

  fetch(url, fetchData)
  .then((resp) => resp.json(), (error) => {
    console.error(error);
    alert('SignUp cannot be completed at this time! Try again');
  })
  .then((data) => {
    if (data.status == 'success') {
      console.log(data);
    } else {
      console.log(data);
    }
  }, (error) => {
    console.error(error);
    alert('SignUp cannot be completed at this time! Try again');
  })
  .catch ((error) => {
    console.error(error);
    alert('Unable to sign up, try again');
  });
}

function fetchAllEntries(userID) {
    const url = `${base_url}/${userID}/entries`;
    const fetchData = { 
      method: 'GET',
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-access-token": "jsj894io42-023]32;'ed;ll;][][#'12=2-303]['ds'\/.,d;e"
      }
    };
  
    fetch(url, fetchData)
    .then((resp) => resp.json(), (error) => {
      console.error(error);
      alert('SignUp cannot be completed at this time! Try again');
    })
    .then((data) => {
      if (data.status == 'success') {
        console.log(data);
      } else {
        console.log(data);
      }
    }, (error) => {
      console.error(error);
      alert('SignUp cannot be completed at this time! Try again');
    })
    .catch ((error) => {
      console.error(error);
      alert('Unable to sign up, try again');
    });
  }
function fetchSingleEntry(userID, entryID) {
    const url = `${base_url}/${userID}/entries/${entryID}`;
    const fetchData = { 
      method: 'GET',
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-access-token": "jsj894io42-023]32;'ed;ll;][][#'12=2-303]['ds'\/.,d;e"
      }
    };
  
    fetch(url, fetchData)
    .then((resp) => resp.json(), (error) => {
      console.error(error);
      alert('SignUp cannot be completed at this time! Try again');
    })
    .then((data) => {
      if (data.status == 'success') {
        console.log(data);
      } else {
        console.log(data);
      }
    }, (error) => {
      console.error(error);
      alert('SignUp cannot be completed at this time! Try again');
    })
    .catch ((error) => {
      console.error(error);
      alert('Unable to sign up, try again');
    });
  }
function notify(userID, setNotice) {
    const url = `${base_url}/${userID}/notify/${setNotice}`;
    const fetchData = { 
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-access-token": "jsj894io42-023]32;'ed;ll;][][#'12=2-303]['ds'\/.,d;e"
      }
    };
  
    fetch(url, fetchData)
    .then((resp) => resp.json(), (error) => {
      console.error(error);
      alert('SignUp cannot be completed at this time! Try again');
    })
    .then((data) => {
      if (data.status == 'success') {
        console.log(data);
      } else {
        console.log(data);
      }
    }, (error) => {
      console.error(error);
      alert('SignUp cannot be completed at this time! Try again');
    })
    .catch ((error) => {
      console.error(error);
      alert('Unable to sign up, try again');
    });
  }