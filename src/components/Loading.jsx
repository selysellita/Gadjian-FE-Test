import React from 'react';
import loading_spin from '../loading.svg'

const Loading = () => {
    return(
        <div style={{ display:'flex',justifyContent:'center', width:'100%'}}>
            <img src={loading_spin} alt='<h1>Loading . . .</h1>' />
        </div>
    )
}

export default Loading;