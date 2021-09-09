import React from 'react';
// import Alert from '@material-ui/lab/Alert';

export default function MessageBox(props) {
    return (
        // <Alert severity="error">Error</Alert>
        <div className={`alert alert-${props.variant || 'info'}`}>
            {props.children} 
        </div>
    )
}
