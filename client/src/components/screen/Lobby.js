import React, {Component} from "react";
import '../../styles.css';
import axios from "../../js/axios.js"

import PlayerList from "./PlayerList"
import {GameContext} from "../GameContext"

class Lobby extends Component {
    constructor(props) {
        super(props);
        this.onClickStart = this.onClickStart.bind(this);
    }

    static contextType = GameContext;

    async componentDidMount() {
        this.createLobby();
    }
    
    // Create new lobby
    async createLobby() {
        const { data } = await axios.get( "/lobby/create");
        if(data === null) return;
        const [,setLobby] = this.context;
        setLobby([{gameid: data.id}]);
    };

    onClickStart() {
        console.log("onClickStart called");
    }

    render() { 
        const headerStyle = {
            fontSize: "14vmin",
            fontFamily: 'Bangers',
        }
        const idStyle = {
            fontSize: "12vmin",
            fontFamily: "Bangers",
            textShadow: "4px 4px 8px black"
        }
        const guideStyle = {
            fontSize: "4vmin",
            fontFamily: "Bangers",
            textShadow: "4px 4px 8px black"
        }
        const buttonStyle = {
            fontSize: "60px",
            fontFamily: "Bangers",
            textShadow: "4px 4px 8px black"
        }
        const buttonHoveredStyle = {
            fontSize: "60px",
            fontFamily: "Bangers",
            textShadow: "8px 8px 16px black"
        }
        const logoStyle = { 
            fontSize: "12vmin",
            textShadow: "4px 4px 8px black"
        };
        const [lobby] = this.context;
        const gameid = lobby[0].gameid;
        return ( 
            <div>
                <div className="row">
                    <div className="center-align flow-text" style={headerStyle}>
                        PICATSO
                    </div>
                    <div className="col s6 offset-s3">
                        <div className="center-align white-text flow-text" style={guideStyle}>
                            Go to picatso.fi <br/> on your mobile device to join in <br/> using room code
                        </div>
                        <div className="center-align white-text flow-text" style={idStyle}>
                            {gameid || "loading..."}
                        </div>
                    </div>
                    <div className="col s3">
                        <i
                            className="material-icons white-text hide-on-small-and-down"
                            style={logoStyle}
                        >
                            phone_android
                        </i>
                    </div>
                </div>
                <div className="container section center-align">
                    <div className="col s12">
                        <div className="btn-large white-text center black center" style={buttonStyle} onClick={this.onClickStart}>Play</div>
                    </div>
                </div>
                <PlayerList/>
            </div>
         );
    }
}
 
export default Lobby;