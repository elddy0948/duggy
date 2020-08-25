import React from 'react';
import '../App.css';
import '../sass/materialize.scss';
import {firestore} from '../firebase';
import firebase from '../firebase';




class Cart extends React.Component{

    constructor(props){
        super(props);
        this.state = {

        };
    }

    componentDidMount(){

    }

    render(){
        return(
            <div id = "cart_body1">
                <div />
                <div id = "cart_body2">
                    <div id = "cart_body_albumlist">
                        <h5 id = "cart_albumtitle">Album list</h5>
                    </div>
                    <div id = "cart_body_scorelist">
                        <h5 id = "cart_scoretitle">score list</h5>
                    </div>
                    <div id = "cart_body_pay">
                        <h5 id = "cart_paytitle">Pay</h5>
                    </div>
                </div>
                <div />
            </div>
        )
    }
}

export default Cart;