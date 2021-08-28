import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Header() {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    return (
        <div className="header">
            <Link to="#default" className="content-logo">
                <img className="logo" src="images/logos/logo.png" alt="logo"/>
            </Link>
            <div className="header-right">
                <Link className="active" to="#home">Inicio</Link>
                <Link to="#contact">Alertas</Link>
                <Link to="#contact">Igresos</Link>
                <Link to="#contact">Gastos</Link>
                <Link to="#about">
                    {userInfo ? userInfo.username : "Login"}
                </Link>
            </div>
        </div>
    )
}
