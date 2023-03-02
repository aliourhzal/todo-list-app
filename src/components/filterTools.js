

export const allFilter = (todos, updateFiltered) => {
	updateFiltered(todos);
}

export const activeFilter = (todos, updateFiltered) => {
	const filtered = todos.filter(todo => !todo.completed);
	updateFiltered(filtered);
}

export const completedFilter = (todos, updateFiltered) => {
	const filtered = todos.filter(todo => todo.completed);
	updateFiltered(filtered);
}