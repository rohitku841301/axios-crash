// GET REQUEST
function getTodos() {
  console.log("GET Request");
  // axios({
  //   method:'get',
  //   url:"https://reqres.in/api/users?page=2"
  // })
  // .then((res)=>{
  //   showOutput(res)
  // })
  // .catch((error)=>{
  //   console.log(error);
  // })

  axios
    .get("https://reqres.in/api/users?page=2", {})
    .then((res) => {
      showOutput(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

// POST REQUEST
function addTodo() {
  console.log("POST Request");
  // axios(
  //   {
  //     method: "post",
  //     url: "https://reqres.in/api/users",
  //     data: {
  //       name: "morpheus",
  //       job: "leader",
  //     },
  //   }
  // )
  // .then((res) => {
  //   showOutput(res);
  // })
  // .catch((error) => {
  //   console.log(error);
  // });

  axios
    .post("https://reqres.in/api/users", {
      data: {
        name: "moasdrpheus",
        job: "leader",
      },
    })
    .then((res) => {
      showOutput(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

// PUT/PATCH REQUEST
function updateTodo() {
  console.log("PUT/PATCH Request");

  axios
    .put("https://reqres.in/api/users/2", {
      data: {
        name: "moscscsasdrpheus",
        job: "leader",
      },
    })
    .then((res) => {
      showOutput(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

// DELETE REQUEST
function removeTodo() {
  console.log("DELETE Request");
  axios
    .delete("https://reqres.in/api/users/2")
    .then((res) => {
      showOutput(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

// SIMULTANEOUS DATA
function getData() {
  console.log("Simultaneous Request");
  axios.all([
    axios.get("https://reqres.in/api/users"),
    axios.get("https://reqres.in/api/users/2")
  ])
  .then(axios.spread((allUser,user)=>{   //spread is built in function in axios which can take all axios request in sequece
      showOutput(user)
  }))
  
  .catch((error)=>{
    console.log(error);
  })
}

// CUSTOM HEADERS
function customHeaders() {
  console.log("Custom Headers");
  const config = {
    headers : {
      token:"sometoken"
    }
  }
  axios
    .post("https://reqres.in/api/users", {
      data: {
        name: "moasdrpheus",
        job: "leader",
      },
    },config)
    .then((res) => {
      showOutput(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'Hello World'
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    })
  };

  axios(options).then(res => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  axios
    .get('https://jsonplaceholder.typicode.com/todoss', {
      // validateStatus: function(status) {
      //   return status < 500; // Reject only if status is greater or equal to 500
      // }
    })
    .then(res => showOutput(res))
    .catch(err => {
      if (err.response) {
        // Server responded with a status other than 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);

        if (err.response.status === 404) {
          alert('Error: Page Not Found');
        }
      } else if (err.request) {
        // Request was made but no response
        console.error(err.request);
      } else {
        console.error(err.message);
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();

  axios
    .get('https://jsonplaceholder.typicode.com/todos', {
      cancelToken: source.token
    })
    .then(res => showOutput(res))
    .catch(thrown => {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      }
    });

  if (true) {
    source.cancel('Request canceled!');
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use((config)=>{
  console.log(`${config.method.toUpperCase()} has sent to this url ${config.url}`)
  return config
},(error)=>{
  return Promise.reject(error)
})

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
