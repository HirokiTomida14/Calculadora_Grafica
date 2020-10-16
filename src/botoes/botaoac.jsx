import React from 'react';
import '../App.css';

export const botao_AC = (props) => (
    <div className="Button" onClick={props.handleClear}>
        {props.children}
    </div>
)