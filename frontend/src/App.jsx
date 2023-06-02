
import { Routes, Route, Navigate } from "react-router-dom";

import Main from "./components/Main";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount"

function App() {
	return (
		<div className="container">
			<Routes>
				<Route path="/" element={<Navigate to="/login" />} />
				<Route path="login" element={<Login />}/>
				<Route path="user" element={<Main />}/>
				<Route path="create-account" element={<CreateAccount />} />
			</Routes>
		</div>
	);
}

export default App
