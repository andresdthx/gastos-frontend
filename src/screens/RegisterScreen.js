import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerUser } from '../actions/userActions';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const submitHandler = (e) => {
        e.preventDefault();
        setError(null);
        if (password === confirmPassword) {
            dispatch(registerUser({username: username, password:password, email: email}));
        } else {
            setError('Las contraseñas no coinciden');
        }
    }

    useEffect(()=>{
        if (userInfo) {
            props.history.push("/");
        }
    })

    return (
        <div className="home" style={{ 
            backgroundImage: `url("images/background/login-2.png")`
            }}>
            <form className="form" onSubmit={submitHandler}>
                <div className="title">
                    Registro
                </div>

                <div>
                    { error && (<MessageBox variant="danger">{error}</MessageBox>)}
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
                    <label htmlFor="username">Email</label>
                    <div>
                        <i className="fas fa-user"></i>
                        <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                onChange={ e => setEmail(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <div>
                        <i class="fas fa-lock"></i>
                        <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div>
                    <label htmlFor="password">Confirmar contraseña</label>
                    <div>
                        <i class="fas fa-lock"></i>
                        <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                onChange={e => setConfirmPassword(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div>
                    <button className="btn primary" type="submit">Registrarme</button>
                </div>

                <div>
                    <Link to="/login">Iniciar sesion</Link> 
                </div>
            </form>
        </div>
    )
}
