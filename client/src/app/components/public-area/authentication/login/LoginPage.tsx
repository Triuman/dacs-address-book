import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { login, selectIsLoggedIn, loadSession } from '../../../../store/session';
import { ICredentials } from '../../../../models/Credentials.interface';
import { NavigationService } from '../../../../services/navigation.service';

function LoginPage() {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState<ICredentials>({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;

    const isLoggedIn = useSelector(selectIsLoggedIn);
    useEffect(() => {
        dispatch(loadSession());
        //if user is already logged in, redirect to address book main page.
        if (isLoggedIn) {
            NavigationService.toAddressBook();
        }
    }, [isLoggedIn, dispatch]);

    function handleChange(e: any) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e: any) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            dispatch(login({ username, password }));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Login</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={handleChange} className={'form-control' + (submitted && !username ? ' is-invalid' : '')} />
                    {submitted && !username &&
                        <div className="invalid-feedback">Username is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                    {submitted && !password &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        Login
                    </button>
                </div>
                <div>
                    If you don't have an account yet
                    <div>
                        <Link to="/register" className="btn btn-link">Register</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export { LoginPage };