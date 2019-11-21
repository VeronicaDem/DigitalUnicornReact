import React from 'react';
import {Link} from 'react-router-dom';
import Error from './Error';
import axios from 'axios';
import './SUstyle.css';
export default class SignUp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            "login":true,
            "register":false
        }
        this.handleRegisterBtn = this.handleRegisterBtn.bind(this);
        this.handleSignUpBtn = this.handleSignUpBtn.bind(this);
    }
    componentWillMount() {
        document.body.className = "signup";
    }
    handleRegisterBtn() {
        this.setState({
            login:false,
            register:true
        })
    }
    handleSignUpBtn() {
        this.setState({
            login:true,
            register:false
        })
    }
    async handleClick() {
        let login = document.getElementById("signup-login").value;
        let email = document.getElementById("signup-email").value;
        let password = document.getElementById("signup-password").value;
        if(this.state.login) {

           axios.get(`/account/authorization?login=${login}&password=${password}`)
                .then((res)=> {
                    this.props.handleUser({
                        login:res.data[0].login,
                        password:res.data[0].password,
                        email:res.data[0].email,
                        user_img:res.data[0].user_img,
                        first_name:res.data[0].first_name,
                        last_name:res.data[0].last_name
                    })
                    this.setState({
                        error:null
                    })
                })
                .catch((error)=> {
                    this.setState({
                        error:error.message
                    })
                });
        }
        if(this.state.register) {
           axios.post(`/account/registration?login=${login}&password=${password}&email=${email}`)
                .then(()=> {
                    this.props.handleUser({login, password,email});
                    this.setState({
                        error:null
                    })
                })
                .catch((error)=>{
                    this.setState({
                        error:error.message
                    })
                })
        }
    }
    render() {
        let error = "";
        if(this.state.error) {
            error = (
                <Error error={this.state.error} />
            )
        }
        return (
            
            <main class="signup">
                {error}
            <div class="flex_cover">
		<div class="header_like">
			<div class="logo_container">
						<img class="logo" src="images/logo/Logo2.png" alt=""/>
						</div>
			<div class="DigitalUnicorn">
					<Link to={`/`}><h1>Di<span>git</span>al Unicorn</h1></Link>
					</div>
			
		</div>

		<div class="registration_sign_up_container">
			<div class="registration_button_container">
				<input type="button" class="button" onClick={this.handleRegisterBtn} value="Зарегестрироваться" />
			</div>
			<div class="sign_up_button_container">
				<input type="button" onClick={this.handleSignUpBtn} class="button" value="Войти" />
			</div>
		</div>
		<div class="content_container">
			<div class="empty_space"></div>
			<div class={this.state.login ? "close" : "email_container"} >
				<input type="email" id="signup-email" name="email" placeholder="Эл. Почта" class="input" id="email"/>
			</div>
			<div class="login_container">
				<input type="text" id="signup-login" name="login" class="input" placeholder="Логин" id="login"/>
			</div>
			<div class="password_container">
				<input type="password" id="signup-password" name="password" class="input" placeholder="Пароль" id="password"/>
			</div>
			<div class="sumbit_container">
				<input type="submit" value="Готово" onClick={this.handleClick} class="button_submit"/>
			</div>
			<div class="empty_space"></div>
		</div>
		</div>
        </main>
       
        )
    }
}