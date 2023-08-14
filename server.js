const express=require('express');
const app=express();
const teacherrouter=require('./routes/teacher');
const studentrouter=require('./routes/student');
const mongoose=require('mongoose');
const mongoDBURL = 'mongodb://0.0.0.0:27017/students'; 
const studentmodel=require('./stddb');
const path=require('path');
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser');
app.use(bodyparser.json());

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Database connected!"))
.catch(err => console.log(err));

const SECRET_KEY = 'yourSecretKey';

// Simulated database of users (replace with your database implementation)
const teachers = [
  { id: 1, username: 'user1', password: 'password1' }, // Store plain text password here
  // Add more users
];
const students = [
  { id: 10, username: 'user1', password: 'password1' }, // Store plain text password here
  // Add more users
];


app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/login',(req,res)=>{
  res.render('login');
})
app.post('/teacher/login',(req, res) => {
  let { username, password } = req.body;

  const user = teachers.find((u) => u.username === username);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  try {
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    //res.json({ token });
    
    res.redirect('/teacher');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

app.post('/student/login', (req, res) => {
  let { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  try {
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

app.use('/teacher',teacherrouter);
app.use('/student',studentrouter);


app.listen(3000,(req,res)=>{
    console.log("Port on 3000");
})