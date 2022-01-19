const express = require('express')
const app = express()

const path = require('path');

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))



let data = []
let id_count = 0
app.use(express.urlencoded({ extended: true }));

app.use('/css', express.static(path.join(__dirname, "/public/css")));
app.set('views', path.join(__dirname, '../views'))
app.set('views', '../views')
app.set('view engine', 'ejs');

// inital system
app.get('/', function (req, res) {
  res.render('home', { error: '' })
})

// when we going to all task screen
app.get('/all_tasks', function (req, res) {
  res.render('all_tasks', { data })
})

// add new task to the data array
app.post('/add_task', function (req, res) {
  if (req.body.task) {
    let object = req.body;
    let num_id = id_count
    object.id = num_id
    id_count += 1
    data.push(object)
    res.render('home', { error: '' })
  } else
    res.render('home', { error: 'You must fill in the field!' })
})


app.get('/delete/:id', function (req, res) {
  let id = req.params.id
  data = data.filter(obj => obj.id != id)
  res.render('all_tasks', { data })

})

