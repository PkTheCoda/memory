import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";



{/* Header component - Has title, Icon, and Restart Button */}
export default function Header(props) {
    return (
        <>
            <dialog id="info-dialog">
                <form method="dialog">
                    <h1 className="font--title diaEl">How to Play?</h1>
                    <p className="font--title diaEl">This is a very simple <b>memory game</b>. The objective is simple: You have to click on as many cards as you can WITHOUT clicking on the same card twice. The app will automatically keep track of your current score along with your highscore. Feel free to restart and reset the game whenever!</p>
                    <p className="diaEl" style={{fontFamily: "Outfit"}}>Made with ❤️ by <a href="https://github.com/PkTheCoda" target="_blank">PkTheCoda</a></p>
                    <button className="dialog--button diaEl">Got It!</button>
                </form>
            </dialog>

            <div className="header--holder">

                <h1 className="header--title">
                    <span className="dialog-info" onClick={() => document.getElementById('info-dialog').showModal()}>
                        <FontAwesomeIcon icon={faCircleInfo} />
                    </span>Memory Game
                </h1>

                <button className="header--button" onClick={props.restart}>Restart</button>
            </div>
            <div className="score--table">
                <div className="current--score score">Current Score: {props.currentScore}</div>
                <div className="high--score score">HighScore: {props.highScore}</div>
            </div>
        </>
    )
}

