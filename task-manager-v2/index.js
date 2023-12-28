const express = require('express');
const taskRoutes = require('./routes/tasksRoute.js')

const app = express()
const port = 3000

// Middleware
app.use(express.json())

app.use('/tasks', taskRoutes)

// Error handling middleware (must be defined last)
app.use((error, req, res, next) => {
  console.error(error.stack); // Log the error stack trace

  res.status(500).send('Something went wrong! Please try again later');
  next();
});

app.listen(port, ()=> console.log(`listening on port ${port}`))
