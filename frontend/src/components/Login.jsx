import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
    const [autherror, setAutherror] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        const res = await axios.post('http://10.11.100.162:3000/auth/login', {
            email,
            password
        }, {
            withCredentials: true
        })

        if (res.status === 200)
            navigate('/user');
    }

    return (
        <>
            {
                autherror && <p className="error">email or password not valid!</p>
            }
            <form className="form" onSubmit={submitHandler}>
                <input type="text" placeholder="email" required/>
                <input type="password" placeholder="password" required/>
                <button type="submit">submit</button>
            </form>
            <p className="noAccount">You don't have an account? <Link to="/create-account">Create One</Link></p>
        </>
    )
}

export default Login;