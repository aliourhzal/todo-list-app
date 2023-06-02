import { useEffect, useState }	from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Title					from './Title';
import TodoBody					from './TodoBody';
import UserInput				from './UserInput';
import Options, { option }		from './Options';

// const retieveTodos = () => {
// 	let oldElements = [];
// 	const oldTodos = {...localStorage};
// 	const toInsert = Object.keys(oldTodos).map((item) => {
// 		return ({...JSON.parse(oldTodos[item])});
// 	});
// 	oldElements = [...toInsert];
// 	oldElements.sort((a,b) => {
// 		const aid = Number(a.id);
// 		const bid = Number(b.id);
// 		return aid - bid;
// 	})
// 	return (oldElements);
// }

let TODOS = [];

function Main() {
	const [filteredTodos, setFilteredTodos] = useState([]);
	const navigate = useNavigate();

	const setTodos = (param) => {
		if (typeof param === 'function')
		 	TODOS = param(TODOS);
		else
			TODOS = [...param];
	}

	useEffect(() => {
		axios.get('http://10.11.100.162:3000/users/todos', {
			withCredentials: true
		})
		.then((res) => {
			setTodos(res.data);
			setFilteredTodos(res.data);
		})
		.catch((e) => navigate('/login'));
	}, [])

	return (
		<>
			<div className="bgimage"></div>
			<main>
				<Title />
				<UserInput 
					mode={option} 
					todos={TODOS} 
					updateTodos={setTodos} 
					updateFiltered={setFilteredTodos}
				/>
				<TodoBody 
					mode={option} 
					todos={TODOS} 
					updateTodos={setTodos} 
					filteredTodos={filteredTodos} 
					updateFiltered={setFilteredTodos}
				/>
				<Options 
					mode={option}
					todos={TODOS}
					updateTodos={setTodos}
					filteredTodos={filteredTodos}
					updateFiltered={setFilteredTodos}
				/>
			</main>
		</>
	);
}

export default Main;
