import React, { Component } from 'react';
import Styled from 'styled-components';

/* Material-UI Component Dependencies */
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';

import API from './API';

// Styled Components
const Wrapper = Styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  margin: 20vh auto;
  border-radius: 8px;
  background-color: #dcdcdc;
  -webkit-box-shadow: 10px 11px 16px -6px rgba(48,48,48,1);
-moz-box-shadow: 10px 11px 16px -6px rgba(48,48,48,1);
box-shadow: 10px 11px 16px -6px rgba(48,48,48,1);
  `;


const Header = Styled.div`
  color: white;
  font-size: 25px;
  height: 8vh;
  line-height: 8vh;
  border-radius: 8px 8px 0px 0px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  background-color: #B5838D;

  -webkit-box-shadow: -4px 4px 10px -7px rgba(48,48,48,1);
-moz-box-shadow: -4px 4px 10px -7px rgba(48,48,48,1);
box-shadow: -4px 4px 10px -7px rgba(48,48,48,1);
`;

class Landing extends Component {
  constructor() {
    super();

    this.state = {
      tasks: [],
      username: '',
      text: '',
      checkedTaskID: ''
    }
  }

  componentDidMount() {
    // GET ALL TODOS
    API.get('/todos')
      .then(response => {
        this.setState({
          tasks: response.data,
          loggedIn: false,
        })
      })
  }

  handleSubmit = () => {
    API.post('/todos', this.state)
      .then(response => {
        this.setState({
          text: '',
          tasks: [...this.state.tasks, response.data]
        });
      })
  }

  handleInput = (event) => this.setState({ text: event.target.value });

  handleEdit = (id, text) => {
    const task = this.state.tasks.find(item => item.id === +id);
    task.text = text;
    API.put(`/todos/${task.id}`, task)
      .then(response => {
        this.setState({
          tasks: response.data
        })
      })
  }

  handleCheck = (event) => {
    const task = this.state.tasks.find(item => item.id === +event.target.value);
    task.completed = !task.completed;
    API.put(`/todos/${task.id}`, task)
      .then(response => {
        this.setState({
          tasks: response.data
        })
      })
  }

  handleDelete = (id) => {
    API.delete(`/todos/${id}`)
      .then(response => {
        this.setState({
          tasks: response.data
        })
      })
  }

  render() {
    const TaskListContent = this.state.tasks ?
      <TaskList tasks={this.state.tasks} xOnChange={this.handleCheck} handleEdit={this.handleEdit} deleteTask={this.handleDelete} /> : "Add a task!"
    return (
      <Wrapper>

        <Header>Tasks</Header>

        <List>
          {TaskListContent}
        </List>

        <NewTodoRow>
          <Input value={this.state.text} onChange={this.handleInput} onSubmit placeholder='Add a To-Do!' />
          <Fab style={{'margin-right': '15px'}} size='small' color="primary" onClick={this.handleSubmit}>
            <AddIcon />
          </Fab>
        </NewTodoRow>

      </Wrapper>
    )
  }
}

const NewTodoRow = Styled.div`
  width:100%;
  flex-direction:row;
  display:flex;
  > div { flex:1;
  margin:15px;}
  > * {
    display:flex;
    margin-right:20px;
  }
`;



const TaskList = (props = {}) => props.tasks.map((item) =>
  <ListItem >
    <Input fullWidth key={item.id} defaultValue={item.text} onBlur={(e) => props.handleEdit(item.id, e.target.value)} />
    <Checkbox onChange={props.xOnChange} value={item.id} checked={item.completed} color="primary"/>
    <Fab style={{'padding': '5px 20px'}} onClick={() => props.deleteTask(item.id)} size='small' >
      <DeleteIcon />
    </Fab>
  </ListItem>
);

export default Landing;



