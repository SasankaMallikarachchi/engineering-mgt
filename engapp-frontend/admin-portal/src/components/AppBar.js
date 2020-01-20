import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import GitHubLogin from 'react-github-login';
import FacebookLogin from 'react-facebook-login';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import Avatar from '@material-ui/core/Avatar';
import $ from "jquery";
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles ={
    largeIcon: {
        width: 60,
        height: 60,
        padding:5 
    },
    addPadding: {
        padding:5 ,
    },
    fbBtn: {
        height: 5,
        width:5
    }
};

const GOOGLE_BUTTON_ID = 'google-sign-in-button'
class AppBarMenu extends Component{
    constructor(props){
        super(props)
        this.state = {
            isSignedIn: false,
            mnuOpen: false,
            log_out_menuOpen: false,
            input: '',
            username: '',
            pic: 'ac1.png',
            isVisible: true,
            buttonTxt: 'Sign up',
            login_method: ''
        }
        this.componentDidMount = this.componentDidMount.bind(this); 
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);       
        this.handleInput = this.handleInput.bind(this);
        this.fblogout = this.fblogout.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.logout = this.logout.bind(this);
    }
    componentDidMount(){     
        window.gapi.load('auth2', function(){
            window.gapi.auth2.init({
                client_id: '866343241114-b7f352tia6l50d9uk5dlj14c924sjcgk.apps.googleusercontent.com'
            })
        })
        window.gapi.signin2.render(
            GOOGLE_BUTTON_ID, 
            {
                width: 5,
                height: 25,
                // onsuccess: this.onSuccess,
            },
        );     
        
    }
    onSuccess(googleUser) {
        const profile = googleUser.getBasicProfile();
        console.log("Name: "+ profile.getName());
        console.log(profile)
        var nm = profile.getName().substring(0,10);
        this.setState({ isSignedIn: true, login_method: 'google', username: nm, pic: profile.Paa})
        if(this.state.username !== null ){
            this.setState({ buttonTxt: 'log out'})
        } 
    }
    logout(){
        // window.gapi.logout()
        // document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost/application-name/logoutUser";
        console.log("log out")
        window.gapi.auth2.getAuthInstance().signOut();
        this.setState({ buttonTxt: 'sign up', username: null, pic: null, login_method: null})
    }
      
    handleClick = event =>{
        this.setState({mnuOpen: event.target})
    }
    handleClose(){
        this.setState({mnuOpen: false})
        if( this.state.username != null )
            this.setState({ buttonText: 'log out'})
    }
    handleInput(e){
        var query = e.target.value;
        this.setState({ input: query })
        this.props.fun1();
    }
    fblogout(){
        window.FB.logout();
        this.setState({ buttonTxt: 'sign up', username: null, pic: null, login_method: null, isSignedIn: false})
        console.log("log out")
        // window.location.reload(false)
    }
    gitlogout(){
        // window.gapi
    }
    render(){
        const responseFacebook = (response) => {
            this.setState({ username: response.name.substring(0,10), login_method: 'fb', isSignedIn: true, pic: response.picture.data.url})
            if(this.state.username !== null ){
                this.setState({ buttonTxt: 'log out'})
            } 
        }
        
        const onSuccessGithub = (response) => {
            console.log(response);
            this.setState({ isSignedIn: true, login_method: 'github'})
            if(response !== null ){
                this.setState({ buttonTxt: 'log out'})
            } 
        }
        const onFailure = response => console.error(response);

        return(
            <div className="root">
                <AppBar position="static" className="app-bar"  style={{ background: '#004466', boxShadow: 'none', borderRadius: '2'}}>
                    <Toolbar  className="app-bar-container">
                    <div >
                        <IconButton className="ib">
                            {
                                this.state.isSignedIn === false ? 
                                <div position="static" className="app-bar-container">

                                <Button onClick={this.handleClick}
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                    style={{ color: '#fff', fontWeight: 'bold', fontSize: '17px', border: 'solid 1px', background: '#1a8cff'}}
                                >
                                    {this.state.buttonTxt} </Button>                                 
                                <Menu
                                    id="simple-menu"
                                    keepMounted
                                    anchorEl={this.state.mnuOpen}
                                    open={Boolean(this.state.mnuOpen)}
                                    onClose={this.handleClose}>
                                    <MenuItem
                                        onClick={this.handleClose}
                                        style={{ height: '40px', width: '60px'}}    
                                    > 
                                    <div id={GOOGLE_BUTTON_ID}  style={{ width: '10px'}}> 
                                        <GoogleLogin
                                            buttonText= ""
                                            style={{ borderRadius: '20px', width: '5px'}}
                                            onSuccess={this.onSuccess}
                                            onFailure={this.onSuccess}
                                            cookiePolicy={'single_host_origin'}
                                        ></GoogleLogin>      
                                    </div>
                                    </MenuItem>
                                    <MenuItem 
                                        onClick={this.handleClose}
                                        style={{ height: '40px', width: '60px'}}    
                                    >
                                    <div >             
                                        <FacebookLogin 
                                            appId="2516883261967992"
                                            fields="name, email, picture"
                                            callback={responseFacebook}
                                            icon="fa-facebook"
                                            textButton=" "
                                            data-auto-logout-link="true"
                                            autoLoad={true}
                                            style={{ width: '30px'}}
                                        >
                                        </FacebookLogin>
                                    </div>            
                                    </MenuItem>
                                    <MenuItem
                                        onClick={this.handleClose}
                                        style={{ height: '40px', width: '80px'}}    
                                    >
                                        <GitHubLogin 
                                            clientId="8a0318914e0ce629202a"
                                            onSuccess={onSuccessGithub}
                                            onFailure={onFailure}
                                            className="git-login"
                                            valid={true}
                                            redirectUri="https://localhost:3000/"
                                            className="gitBtn"
                                        >
                                        <span className="IconButton-label">
                                            <svg className="Icon-root Icon-small"
                                                focusable="false" viewBox="0 0 24 24"
                                                aria-hidden="true" role="presentation">
                                                <path d="M 12 0.3 a 12 12 0 0 0 -3.8 23.4 c 0.6 0.1 0.8 -0.3 0.8 -0.6 v -2 c -3.3 0.7 -4 -1.6 -4 -1.6 c -0.6 -1.4 -1.4 -1.8 -1.4 -1.8 c -1 -0.7 0.1 -0.7 0.1 -0.7 c 1.2 0 1.9 1.2 1.9 1.2 c 1 1.8 2.8 1.3 3.5 1 c 0 -0.8 0.4 -1.3 0.7 -1.6 c -2.7 -0.3 -5.5 -1.3 -5.5 -6 c 0 -1.2 0.5 -2.3 1.3 -3.1 c -0.2 -0.4 -0.6 -1.6 0 -3.2 c 0 0 1 -0.3 3.4 1.2 a 11.5 11.5 0 0 1 6 0 c 2.3 -1.5 3.3 -1.2 3.3 -1.2 c 0.6 1.6 0.2 2.8 0 3.2 c 0.9 0.8 1.3 1.9 1.3 3.2 c 0 4.6 -2.8 5.6 -5.5 5.9 c 0.5 0.4 0.9 1 0.9 2.2 v 3.3 c 0 0.3 0.1 0.7 0.8 0.6 A 12 12 0 0 0 12 0.3 ">
                                                </path>
                                            </svg>
                                        </span>
                                        </GitHubLogin>
                                    </MenuItem>
                                </Menu> 
                                </div> : null
                            }
                        </IconButton>
                        <IconButton className="ib">     
                            { 
                                this.state.login_method === 'google' && this.state.isSignedIn === true  ? 
                                    <GoogleLogout buttonText="log out"
                                                    clientId="866343241114-b7f352tia6l50d9uk5dlj14c924sjcgk.apps.googleusercontent.com"
                                                    onLogoutSuccess={this.logout}>

                                    </GoogleLogout> : null
                            }
                            {
                                this.state.isSignedIn === true && this.state.login_method !== 'google' ? 
                                    <Button onClick={this.fblogout}    
                                            style={{ color: '#fff', fontWeight: 'bold', fontSize: '17px', border: 'solid 1px', background: '#1a8cff'}}                             style={{ color: '#fff', fontWeight: 'bold', fontSize: '17px', border: 'solid 1px', background: '#1a8cff'}}
                                    >
                                        {this.state.buttonTxt}
                                    </Button> : null
                            }
                        </IconButton> 
                        <IconButton className="ib">
                            <Avatar src={this.state.pic}/>
                            {this.state.isVisible ? <p className="logged-name">{this.state.username}</p> : null}
                        </IconButton> 
                    </div>
                    </Toolbar>
                </AppBar>
               
            </div>
        );
    }
}

export default AppBarMenu;
