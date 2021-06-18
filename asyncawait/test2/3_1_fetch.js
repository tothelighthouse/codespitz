fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => console.log("response:", response))
  .catch(error => console.log("error:", error));