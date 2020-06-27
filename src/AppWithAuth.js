import React, { useEffect } from "react";
import {State} from './contexts/auth'
import App from './App';

export default function AppWithAuth(){
    return (
        <State>
            <App/>
        </State>
    );
}

