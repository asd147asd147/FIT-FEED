import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router-dom';


class Facebook extends Component {
    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
    }

    responseFacebook = response => {
        this.setState({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.email
        });
    };

    componentClicked = () => console.log('clicked');

    render(){
        let fbContent;
        if(this.state.isLoggedIn){
            console.log("Hello FITFEED");
        }
        else{
            // fbContent = (
            //     <FacebookLogin
            //     appId="481802666494759"
            //     autoLoad={true}
            //     fields="name,email,picture"
            //     onClick={this.componentClicked}
            //     callback={this.responseFacebook} />
            // )
        }

        return(
            <div>{fbContent}</div>
        )
    }

}

export default Facebook;