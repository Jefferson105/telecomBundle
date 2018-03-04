import React from 'react';
window.React = React;
import { render } from "react-dom"; 
import "../scss/style.scss";
import CardsBundle from "./components/cardsBundle.jsx";

window.onload = function() {
    render(
        <CardsBundle />,
        document.getElementById("plans")
    )
}