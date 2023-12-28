const http = require("http")

const port = 8000

const server = http.createServer((req, res)=>{
  // res.end("Hello world!")
  // plain text
  // text/html 
  // application/json

  // HTTP Status
  // 100 - 199 - informational response
  // 200 - 299 - success response
  // 300 - 399 - redirection
  // 400 - 499 - client error
  // 500 - 599 - server error

  if (req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    })
    res.end("Welcome Home")
  } else if (req.url === '/books') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    const books = {
      name: 'book1',
      price: 200,
      author: 'caesar',
    }

    res.end(JSON.stringify(books))
  } else if (req.url === '/about') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.end('<h1>About us</h1>')
  } else if (req.method === 'POST') {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    })
    res.end("POST method")
  } else {
    res.end('not found')
  }
})

server.listen(port, ()=>{
  console.log('Sever is running correctly at port ', port )
})
