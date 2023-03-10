
export function Ticket(props) {
	const classes = 'ticket ' + props.className;
	return (
		<div className={classes}>
			{props.children}
		</div>
	);
}

function TodoItem(props) {

	const onCheck = (e) => {
		const alter = props.todos.map((todo) => {
			if (todo.id === Number(props.children.id))
			{
				const mod = {...todo};
				mod.completed = !mod.completed;
				return mod;
			}
			return todo;
		});
		props.updateTodos(alter);
		localStorage.clear();
		for (const todo of alter)
		{
			localStorage.setItem(todo.id, JSON.stringify(todo));
			console.log(todo);
		}
		if (props.mode === 'completed')
			props.updateFiltered(alter.filter(todo => todo.completed));
		else if (props.mode === 'active')
		{
			const hello = alter.filter(todo => !todo.completed);
			props.updateFiltered(hello);
		}
		else if (props.mode === 'all')
			props.updateFiltered(alter);

	}

	const deleteTodo = (e) => {
		const rest = props.todos.filter(todo => todo.id !== Number(props.children.id));
		const alter = props.filteredTodos.filter(todo => todo.id !== Number(props.children.id));
		props.updateTodos(rest);
		props.updateFiltered(alter);
		localStorage.removeItem(props.children.id);
	}

	return (
		<Ticket className="todoItem">
			<input type="checkbox" onChange={onCheck} checked={props.children.completed}/>
			<p className="content">{props.children.content}</p>
			<svg onClick={deleteTodo} xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
		</Ticket>
	);
}

function TodoBody (props) {
	return (
		<div className="todo-body">
			{
				props.filteredTodos.length > 0 ? props.filteredTodos.map((item) => {
					return (
						<TodoItem key={item.id} mode={props.mode} todos={props.todos} updateTodos={props.updateTodos} filteredTodos={props.filteredTodos} updateFiltered={props.updateFiltered}>{item}</TodoItem>
					)
				}) : <Ticket className='todoItem'><p className="content empty">Empty...</p></Ticket>
			}
		</div>
	);
}

export default TodoBody;
