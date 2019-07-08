import React from 'react';
import style from './app.less'
import Map from '../map/Map';


const App = () => {
    return(
        <div className={style.mainContainer}>
            <Map/>
        </div>
    )
}


export default App;