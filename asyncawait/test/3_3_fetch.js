fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(post => console.log("post:", post))
  .catch(error => console.log("error:", error));