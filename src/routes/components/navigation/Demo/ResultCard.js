import React from 'react';

export default function ResultCard(props) {
    if (!props.num) {
        return null
    }
    const { num } = props;
    return (
        <img src={`/cards/${num}.png`} alt="card" style={{width:"25%" , height:'30%'}} />
    );
}

