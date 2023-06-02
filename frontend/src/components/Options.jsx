import axios from 'axios';
import * as filterTools			from './filterTools';
import { Ticket }		        from './TodoBody';


export let option = 'all';

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
	const clearAll = async () => {
		const rest = props.todos.filter(todo => !todo.completed);
		props.updateTodos(rest);
		if (props.mode === 'completed')
			props.updateFiltered([]);
		else if (props.mode === 'all')
			props.updateFiltered(rest);
		await axios.delete('http://10.11.100.162:3000/users/todos/completed', {
			withCredentials: true
		})
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

export default Options;