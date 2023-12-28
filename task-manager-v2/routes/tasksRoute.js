const express = require('express')

// initialize
const route = express.Router()

// dummy
const task_manager = []

route.get('/', (req, res)=> {
  const {title} = req.query;

  let searchResults = []
  if (title) {
    const searchByTitle = task_manager.find((task) => {
      return task.title === title
    })

    if (searchByTitle) {
      res.status(200).send(searchByTitle)
    } else {
      res.status(404).send('Task not found')
    }
    
  }

  res.status(200).send(task_manager)
})

// Create
route.post('/add', async (req, res, next) => {
  const {title, description, status, deadline} = req.body;
  const id = task_manager.length + 1
  const date_created = new Date()

  task_manager.push({
    id,
    title,
    description,
    status,
    deadline,
    date_created
  })

  res.status(201).send(task_manager)
})

// Get Single Task
route.get('/:id', async(req,res, next)=>{
  const id = req.params.id
  
  const task = task_manager.find(task => task.id === parseInt(id))

  if (task) {
    res.send(task)
  } else {
    res.status(404).send('Task not found')
  }
})

// Update Task
route.put('/:id/update', async (req, res, next) => {
  try {
    const id = req.params.id
    const {title, description, status, deadline} = req.body;
    const date_created = new Date()

    const task = task_manager.find(task => task.id === parseInt(id))

    if(task) {
      title.id = id
      task.title = title
      task.description = description
      task.status = status
      task.deadline = deadline
      task.date_created = date_created

      res.status(200).send(task_manager)
    } else {
      res.status(404).send('Task not found')
    }
  } catch (error) {
    next(error)
  }
})

// Delete Task
route.delete('/:taskId/remove', async (req, res, next) => {
  try {
    const id = req.params.taskId

    const task = task_manager.find(task => task.id === parseInt(id))

    if (task) {
      const index = task_manager.indexOf(task)
      task_manager.splice(index, 1)

      res.status(200).send(task_manager)
    } else {
      res.status(404).send('Task not found')
    }
  } catch (error) {
    next(error)
  }
})

module.exports = route
