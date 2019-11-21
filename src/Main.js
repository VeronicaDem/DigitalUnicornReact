import React from 'react';
import App from "./App";
import SignUp from './SignUp';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
export default class Main extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          login: "",
          password:"",
          email:"",
          user_img:"",
          first_name:"",
          last_name:""
          
      }
      this.WrappedApp = this.WrappedApp.bind(this);
      this.WrappedAppBecomeAuthor = this.WrappedAppBecomeAuthor.bind(this);
      this.handleUser = this.handleUser.bind(this);
      this.WrappedSignUp = this.WrappedSignUp.bind(this);
  }
    WrappedApp(props) {
      return (<App {...props} login={this.state.login} 
                   password={this.state.password} 
                   email={this.state.email}
                   user_img={this.state.user_img}
                   first_name={this.state.first_name}
                   last_name={this.state.last_name}
                   component={"AppBlogs"}
                    
                        />);
  }
  handleUser({login, password, email,  user_img, first_name, last_name}) {
      this.setState({
          login,
          password,
          email,
          user_img,
          first_name,
          last_name
      })
  }
  WrappedSignUp(props) {
      return (
          <SignUp {...props} 
             handleUser={this.handleUser}
          />
      )
  }
  WrappedAppBecomeAuthor(props) {
      if(this.state.login) {
      return (<App {...props} login={this.state.login} 
        password={this.state.password} 
        email={this.state.email}
        user_img={this.state.user_img}
        first_name={this.state.first_name}
        last_name={this.state.last_name}
        component={"BecomeAuthor"}
         
             />);
      }
      else {
          return <Redirect to="/SignUp"/>
      }
  }
   render() {
      return( 
       <BrowserRouter>
         <Route exact path="/" component={this.WrappedApp}/>
         <Route exact path="/SignUp" component={SignUp}/>
         <Route exact path="/BecomeAuthor" component={this.WrappedAppBecomeAuthor} />
       </BrowserRouter>
       )
   }
}