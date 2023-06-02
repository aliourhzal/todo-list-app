import { useState }				from 'react';
import axios from 'axios';
import * as filterTools			from './filterTools';

function UserInput(props) {
	const [content, setContent] = useState('');

	function todoContentHandler(event) {
		setContent(event.target.value);
    }

	async function submitContentHandler(event) {
		event.preventDefault();
		if (content === '')
			return;
		const newContent = {
			content: content,
            completed: false
		}
		const todo = await axios.post('http://10.11.100.162:3000/users/todos', newContent, {
			withCredentials: true
		});
        setContent('');
		props.updateTodos(oldTodos => {
			const content = [...oldTodos, todo.data];
			switch (props.mode) {
				case 'all':
					filterTools.allFilter(content, props.updateFiltered);
					break;
				case 'active':
					filterTools.activeFilter(content, props.updateFiltered);
					break;
				case 'completed':
					filterTools.completedFilter(content, props.updateFiltered);
					break;
				default:
			}
			return content;
		})
	}

	return (
		<form className="user-input ticket" onSubmit={submitContentHandler}>
			<input type="submit" value=" "/>
			<input type="text" value={content} placeholder="Creat a new todo..." onChange={todoContentHandler}/>
		</form>
	);
}

export default UserInput;