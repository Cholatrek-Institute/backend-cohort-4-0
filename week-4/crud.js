const http = require('http');
const urlNode = require('url')

// dummy database
const books = [];

const server = http.createServer((req, res) => {
  const method = req.method
  const url = req.url
  const query = urlNode.parse(url, true).query
  console.log(query)
  if (method === 'GET'){
    // Get all the books
    if (url === '/books'){
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(books))
    } else if (url.startsWith('/books')  && query.id ){
      // find the specific book
      const book = books.find(book => book.id === parseInt(query.id))

      if (book) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(book))
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain'} )
        res.end('Book Not Found')
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain'} )
      res.end('Not Found')
    }

  } else if (method === 'POST'){
    // Create a new book
    // {
    //   title: 'sss',
    //   author: 'destiny',
    //   year: 2019
    //   price: 100
    // }
    if (url === '/books') {
      let body = ''
      req.on('data', chunk => {
        body += chunk.toString()
      })
      req.on('end', ()=> {
        const newBook = JSON.parse(body)
        newBook.id = books.length + 1
        books.push(newBook)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(books))
      })
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain'} )
      res.end('Not Found')
    }
  } else if (method === 'PUT') {
    if (url.startsWith('/books')  && query.id ) {
      let body = ''
      req.on('data', chunk => {
        body += chunk.toString()
      })

      req.on('end', ()=> {
        const bookIndex = books.findIndex(book => book.id === parseInt(query.id))
        if (bookIndex !== -1) {
          const updatedBook = JSON.parse(body)
          updatedBook.id = parseInt(query.id)
          books[bookIndex] = updatedBook
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(updatedBook))
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain'} )
          res.end('Book Not Found')
        }
      })
    }

  } else if (method === 'DELETE'){
    if (url.startsWith('/books')  && query.id ) {
      const bookIndex = books.findIndex(book => book.id === parseInt(query.id))
      if (bookIndex !== -1) {
        books.slice(bookIndex, 1);
        res.writeHead(200, { 'Content-Type': 'text/plain'} )
        res.end('Book Deleted')
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain'} )
        res.end('Book Not Found')
      }
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain'} )
    res.end('Method Not Allowed')
  }
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
