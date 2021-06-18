fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(response => response.json())
  .then(post => post.userId)
  .then(userId => "https://jsonplaceholder.typicode.com/users/" + userId)
  .then(url => fetch(url))
  .then(response => response.json())
  .then(user => console.log("user:", user))
  .catch(error => console.log("error:", error));