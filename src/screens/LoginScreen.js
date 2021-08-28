import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';
import { Link } from 'react-router-dom';

export default function LoginScreen(props) {

    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin({username: username, password: password}));
    }

    useEffect(()=>{
        if(userInfo) {
            props.history.push("/")
        }
    }, [userInfo, props])
    return (
        <div className="home" style={{ 
            backgroundImage: `url("images/background/login-2.png")`
            }}>
            <form className="form" onSubmit={submitHandler}>
                <div className="title">
                    Login
                </div>

                <div>
                    <label htmlFor="username">Username</label>
                    <div>
                        <i className="fas fa-user"></i>
                        <input
                                type="text"
                                id="username"
                                placeholder="Username"
                                onChange={ e => setUsername(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <div>
                        <i className="fas fa-lock"></i>
                        <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                        ></input>
                    </div>
                    <span><Link to="/">recuperar contraseña</Link></span>
                </div>
                <div>
                    <button className="btn primary" type="submit">Sign In</button>
                </div>

                <div>
                    <Link to="/register">Registrarme</Link> 
                </div>
            </form>
        </div>
    )
}
