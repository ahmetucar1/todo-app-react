import { isEditable } from '@testing-library/user-event/dist/utils';
import React from 'react'
import {useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';

const Form = () => {
    const [todo, setTodo] = useState('')
	const [list, setList] = useState([])
	const [editTodos, setEditTodos] = useState('')
   
	useEffect(() => {
       
	}, [todo])

	const addTodo = (e) => {
        e.preventDefault()
		setList(prevList => [ ...prevList, {id: uuidv4(), todo: editTodos, isEditable: false, isCompleted: false}])
		setEditTodos('')
	}

    const completeTodo = (id) => {
		setList(prevList => prevList.map(todoItem => todoItem.id === id ? {...todoItem, isCompleted: !todoItem.isCompleted} : todoItem))
	}

	const editTodo = (id, oldTodo) => {
		setList(prevList => prevList.map(todoItem => todoItem.id === id ? {...todoItem, isEditable: !todoItem.isEditable} : todoItem))
	    setTodo(oldTodo)
	}

    const saveTodo = (id) => {
        setList(prevList => prevList.map( todoItem => todoItem.id === id ? {...todoItem, isEditable: !todoItem.isEditable, todo: todo} : todoItem))
	}

	const deleteTodo = (id) => {
		setList(prevList => prevList.filter(todoItem => todoItem.id !== id))
	}

  return (
 <>
	<div className='todoapp'>
    <header className="header">
		<h1>todos</h1>
		<form onSubmit={addTodo}>
			<input onChange={(e) => setEditTodos(e.target.value)} 
			value={editTodos} 
			className="new-todo" 
			placeholder="What needs to be done?" 
			autoFocus />
		</form>
	</header>
	</div>
	
	<section className="main">
		<input className="toggle-all" type="checkbox" />
		<label htmlFor="toggle-all">
			Mark all as complete
		</label>
		{
			list.map(
				(todoItem) =>
			
			<ul key={todoItem.id} className="todo-list">
			<li>
				<div className="view">
					<input 
					value={todoItem.isCompleted}
					onChange={() => completeTodo(todoItem.id)} 
					className="toggle" 
					type="checkbox" />
					{
					 !todoItem.isEditable ?	
					 <label className={`${todoItem.isCompleted ? 'completed' : '' }`}
					 onClick={() => editTodo(todoItem.id, todoItem.todo)}> {todoItem.todo} </label>
					 :
					 <form onSubmit={() => saveTodo(todoItem.id)}>
					 <input onChange={(e) => setTodo(e.target.value)} 
					 value={todo} 
					 className="new-todo" 
					 autoFocus />
					 </form>
					} 
					<button onClick={ () => deleteTodo(todoItem.id)} className="destroy"></button>
				</div>
			</li>
		</ul>
		)
		}
	</section>
	
 
<footer className="info">
<p>Click to edit a todo</p>
<p>Created by <a href="https://github.com/ahmetucar1">Ahmet</a></p>
<p>Part of <a href="https://todo-app-react-henna.vercel.app/">Live</a></p>
</footer> 
</>
  )
}

export default Form
