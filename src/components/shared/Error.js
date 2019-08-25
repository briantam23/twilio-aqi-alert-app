import React, { Fragment } from 'react';
import style from './error.less';


const Error = ({ error, handleClearError }) => (
    <Fragment>
    {
        error ? (
            <div onClick={ () => handleClearError() } className={ style.errorMessage }>
                <strong>{ error }</strong>
            </div> 
        ) : null
    }
    </Fragment>
)


export default Error