import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { history } from '../../../../helpers/history'
import { register, selectIsLoggedIn } from '../../../../store/session';
import { IRegisterInfo } from '../../../../models/RegisterInfo.interface';

function RegisterPage() {
    const [inputs, setInputs] = useState<IRegisterInfo>({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(selectIsLoggedIn);
    useEffect(() => {
        //if user is already logged in, redirect to address book main page.
        if (isLoggedIn) {
            history.push('/addressbook');
        }
    }, []);

    function handleChange(e: any) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e: any) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            dispatch(register({ username, password }));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Register</h2>
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
                        Register
                    </button>
                    <Link to="/login" className="btn btn-link">Login</Link>
                </div>
            </form>
        </div>
    );
}

export { RegisterPage };