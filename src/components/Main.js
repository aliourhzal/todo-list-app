import { useState }				from 'react';
import Title					from './Title';
import TodoBody					from './TodoBody';
import UserInput				from './UserInput';
import Options, { option }		from './Options';

const retieveTodos = () => {
	let oldElements = [];
	const oldTodos = {...localStorage};
	const toInsert = Object.keys(oldTodos).map((item) => {
		return ({...JSON.parse(oldTodos[item])});
	});
	oldElements = [...toInsert];
	oldElements.sort((a,b) => {
		const aid = Number(a.id);
		const bid = Number(b.id);
		return aid - bid;
	})
	return (oldElements);
}

function Main() {
	const [todos, setTodos] = useState([...retieveTodos()]);
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
