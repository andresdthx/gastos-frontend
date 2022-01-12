import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../actions/userActions';
import { Link, useHistory  } from 'react-router-dom';
import LoadingBox from '../../components/utils/LoadingBox';
import MessageBox from '../../components/MessageBox';

export default function LoginScreen(props) {

    const dispatch = useDispatch();
    const history = useHistory();

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo, error, loading } = userSignin;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin({username: username, password: password}));
    }

    useEffect(()=>{
        if(userInfo) history.push("/");
    }, [userInfo, history])
    
    return (
        <div className="home">
            
            <form className="form" onSubmit={submitHandler}>
                
                <div className="title">
                    Iniciar sesión
                </div>

                <div>
                    <input
                            type="text"
                            id="username"
                            placeholder="Username"
                            onChange={ e => setUsername(e.target.value)}
                    ></input>
                </div>
                <div>
                    <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                    ></input>
                    {/* <span><Link to="/">recuperar contraseña</Link></span> */}
                </div>
                <div>
                    {
                        loading ? <LoadingBox />
                        :
                        (
                            <button className="btn primary" type="submit">Iniciar Sesión</button>
                        )
                    }
                </div>

                <div>
                    <Link to="/register">¿Olvidaste tu contraseña?</Link> 
                </div>

                <div>
                    { error && <MessageBox variant="danger">{error}</MessageBox> }
                </div>
            </form>
            <div className="box-register">
                <div>
                    <span>
                        <Link to="/register">Crear una cuenta</Link> 
                    </span>
                </div>
            </div>
        </div>
    )
}
