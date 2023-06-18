import React from "react";

export default function Card(props) {
    return (
        <div className="card--container" onClick={() => props.click(props.id)}>
            <img className="card--image" src={props.src} alt={`picture of the pokemon, ${props.name}`} />
            <h1 className="font--title" style={{fontSize:"2vw"}}>{props.name}</h1>
        </div>
    )
}