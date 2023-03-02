import { useState }				from 'react';
import Title					from './Title';
import TodoBody, { Ticket }		from './TodoBody';
import UserInput				from './UserInput';
import * as filterTools			from './filterTools';

let option = 'all';

function Filters (props) {

	const allFilter = () => {
		option = 'all';
        filterTools.allFilter(props.todos, props.updateFiltered);
	}

	const activeFilter = () => {
		option = 'active';
        filterTools.activeFilter(props.todos, props.updateFiltered);
	}

	const completedFilter = () => {
        option = 'completed';
        filterTools.completedFilter(props.todos, props.updateFiltered);
    }

	return (
		<div className='options'>
			<input id='all' name='options' type="radio" onChange={allFilter}/>
			<label htmlFor="all">All</label>
			<input id='active' name='options' type="radio" onChange={activeFilter} />
			<label htmlFor="active">Active</label>
			<input id='completed' name='options' type="radio" onChange={completedFilter} />
			<label htmlFor="completed">Completed</label>
		</div>
	);

}

function Clear(props) {
	const clearAll = () => {
		const rest = props.todos.filter(todo => !todo.completed);
		props.updateTodos(rest);
		if (props.mode === 'completed')
			props.updateFiltered([]);
		else if (props.mode === 'all')
			props.updateFiltered(rest);
	}
	return (
		<span className='clear' onClick={clearAll}>{props.children}</span>
	);
}

function Options(props) {

	return (
		<Ticket className='optionsTicket'>
			<span className='counter'>{props.filteredTodos.length} items left</span>
			<Filters todos={props.todos} updateFiltered={props.updateFiltered}/>
			<Clear mode={props.mode} todos={props.todos} updateTodos={props.updateTodos} updateFiltered={props.updateFiltered}>Clear Completed</Clear>
		</Ticket> 
	);
}

function Main() {
	const [todos, setTodos] = useState([
		{
			id: 1,
            content: 'Learn React',
            completed: false
		},
		{
			id: 2,
            content: 'Learn Redux',
            completed: false
		},
		{
			id: 3,
            content: 'aaaaa',
            completed: false
		},{
			id: 4,
            content: 'dkushgiud',
            completed: false
		},
	]);
	const [filteredTodos, setFilteredTodos] = useState(todos);

	return (<main>
		<Title />
		<UserInput 
			mode={option} 
			todos={todos} 
			updateTodos={setTodos} 
			updateFiltered={setFilteredTodos}
		/>
		<TodoBody 
			mode={option} 
			todos={todos} 
			updateTodos={setTodos} 
			filteredTodos={filteredTodos} 
			updateFiltered={setFilteredTodos}
		/>
		<Options 
			mode={option}
			todos={todos}
			updateTodos={setTodos}
			filteredTodos={filteredTodos}
			updateFiltered={setFilteredTodos}
		/>
	</main>);
}

export default Main;
