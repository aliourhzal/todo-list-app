import { useState }				from 'react';
import * as filterTools			from './filterTools';

function UserInput(props) {
	const [content, setContent] = useState('');

	function todoContentHandler(event) {
		setContent(event.target.value);
    }

	function submitContentHandler(event) {
		event.preventDefault();
		if (content === '')
			return;
		const newContent = {
			id: Date.now(),
			content: content,
            completed: false
		}
        setContent('');
		props.updateTodos(oldTodos => {
			const content = [...oldTodos, newContent];
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