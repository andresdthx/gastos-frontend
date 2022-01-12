import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

export default function FloatButton(props) {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const [url, setUrl] = useState('');

    useEffect(()=>{
        const path = props.props.location.pathname;
        switch (path) {
            case '/':
                setUrl('/expenses-create');
                break;
            case '/activities':
                setUrl('/activities-create');
                break;
            case '/alerts':
                setUrl('/alerts-create');
                break;
        
            default:
                break;
        }
    }, [props]);

    return (
        <div>
            {
                userInfo && 
                (
                    <Link to = {url}>
                        <div className="floating-button">
                            <button className="btoncito">
                                <AddIcon />
                            </button>
                        </div>
                    </Link>
                )
            }
        </div>
    )
}
