import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useState } from "react";

function CreateAccount() {
    const [passwdError, setPasswdError] = useState(false)
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const firstName = e.target[0].value;
        const lastName = e.target[1].value;
        const email = e.target[2].value
        const passwd = e.target[3].value;
        const confirmPasswd = e.target[4].value;

        if (passwd !== confirmPasswd)
        {
            setPasswdError(true);
            return ;
        }
        setPasswdError(false);
        const {data: user} = await axios.post('http://10.11.100.162:3000/users/create', {
            firstName,
            lastName,
            email,
            password: passwd
        });
        navigate('/');
    }

    return (
        <form className="form" onSubmit={submitHandler}>
            <input type="text"      placeholder="first name"        required/>
            <input type="text"      placeholder="last name"         required/>
            <input type="email"     placeholder="email"             required/>
            <input type="password"  placeholder="password"          required/>
            <input type="password"  placeholder="Confirm password"  required/>
            <button type="submit">Submit</button>
            {
                passwdError && <p className="error">password doesn't match</p>
            }
        </form>
    );
}

export default CreateAccount;