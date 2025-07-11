import React, { useState, useEffect } from 'react'
import './app.css'
import { signup, login, getTasks, createTask, updateTask, deleteTask } from './api'
const App = () => {
  const [page, setPage] = useState('signup')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const fetchTasks = async (passedToken) => {
    try {
      const actualToken = passedToken || token;
      console.log("Token before request:", actualToken);
      const res = await getTasks(actualToken);
      console.log('response of tasks is', res);
      setTasks(res.data);
      setPage('tasks');
      setMessage('');
    } catch (err) {
      console.error(err);
      setMessage('Failed to fetch tasks. Please try again.');
    }
  };

  const handleSignup = async () => {
    try {
      const res = await signup({ username, email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setMessage('Signed up successfully! Redirecting...');

    } catch (err) {
      console.error(err);
      setMessage('Signup failed. Please check your data.');
    }
  };

  const handleLogin = async () => {
    try {
      const res = await login({ username, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setMessage('Logged in successfully! Redirecting...');

    } catch (err) {
      console.error(err);
      setMessage('Login failed. Invalid username or password.');
    }
  };

  const handleCreate = async () => {
    try {
      await createTask({ title, description }, token);
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (err) {
      console.error(err);
      setMessage('Failed to create task.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id, token);
      fetchTasks();
    } catch (err) {
      console.error(err);
      setMessage('Failed to delete task.');
    }
  };

  const handleUpdate = async (id) => {
    try {
      await updateTask(id, { title: editTitle, description: editDescription }, token);
      setEditingTaskId(null);
      setEditTitle('');
      setEditDescription('');
      fetchTasks();
    } catch (err) {
      console.error(err);
      setMessage('Failed to update task.');
    }
  };
  if (!token) {
    return (
      <div className='signupandlogincontainer'>
        {message && <p style={{ color: 'red',textAlign:'center' }}>{message}</p>}
        {page === 'signup' ? (

          <div className="container">
            <div className="signupheading" style={{textAlign:'center'}}><h1>Sign Up</h1></div>
            <div className="subcontainer">
              <div className="contentcontainer">
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='enter your username' ></input>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter your email'></input>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='enter password'></input>
                <button id='b1' onClick={handleSignup}>Sign Up</button>
                <div>already have an account?<span onClick={() => { setPage('login'); setMessage(''); }} style={{cursor:'pointer',color:'brown'}}>Login</span></div>
              </div>
            </div>
          </div>
        ) :
          (
            <div className="container">
              <div className="loginheading" style={{textAlign:'center'}}><h1>LOG IN</h1></div>
              <div className="subcontainer">
                <div className="contentcontainer">
                  <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='enter your username' ></input>
                  <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='enter password'></input>
                  <button id='b1' onClick={handleLogin}>Log In</button>
                  <div>Don't have an account? <span onClick={() => { setPage('signup'); setMessage(''); }} style={{cursor:'pointer',color:'brown'}}>Sign Up</span></div>

                </div>
              </div>
            </div>
          )}

      </div>
    );
  }

  return (
    <div className='taskconatin'>
      <header id='headercontain'>
        <h2 id='taskheading'>Task Dashboard</h2>
        <button id='b2' onClick={() => {
          localStorage.removeItem('token');
          setToken('');
          setPage('login');
          setMessage('Logged out successfully.');
        }}>Logout</button>
      </header>

      <div style={{ padding: 20 }} className='taskcontainer'>
        {message && <p style={{ color: 'red',textAlign:'center' }}>{message}</p>}

          <h1 id='createtask'>Create Task</h1>
        <div className="createtaskcontainer">
          <h4>Title</h4>
          <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <h4>Description</h4>
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button onClick={handleCreate} id='addbutton'>Add Task</button>
        </div>
        <h3 id='yourtasks'>Your Tasks</h3>
        {tasks.map((task) => (
          <div key={task.id} style={{ marginBottom: 10 }} id='finaltasks'>
            <b>{task.title}</b> - {task.description}
            <button onClick={() => {
              setEditingTaskId(task.id);
              setEditTitle(task.title);
              setEditDescription(task.description);
            }} id='editbutton'>
              Edit
            </button>
            <button onClick={() => handleDelete(task.id)} id='deletebutton'>Delete</button>
            {editingTaskId === task.id && (
              <div>
                <input
                  placeholder="New Title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  placeholder="New Description"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <button onClick={() => handleUpdate(task.id)} id='savebutton'>Save</button>
                <button onClick={() => setEditingTaskId(null)} id='cancelbutton'>Cancel</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}



export default App
