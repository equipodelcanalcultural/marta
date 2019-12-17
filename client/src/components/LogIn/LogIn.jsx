import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getData } from "../../store/actions/reduxFetch";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import LoginSuccess from '../Alerts/LoginSuccess';
import LoginError from '../Alerts/LoginError';
import {connect} from 'react-redux';
import {userLoginFetch} from '../../store/actions/userActions';

const responseGoogle = response => {
  console.log(response);
};
class LogIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      sessionuser: "",
      googleuser: "",
      isLogged:"",
      error:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGMailSubmit = this.handleGMailSubmit.bind(this)
  }

  handleChange = async (event) =>{
    await this.setState({[event.target.name]:event.target.value});
     if (this.state.username.length==1|| 
      this.state.password.length ==1) {this.setState({error: false})}
    }

  cleanForm = () => {
    this.setState({ username: "",
    email: "",
    password: ""})
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await this.props.userLoginFetch(this.state)
    const { logged } = this.props;
    if(logged == true){
      console.log("entra acá")
      this.setState({isLogged:true})
    }else if(logged == false){
      console.log("entró")
      this.setState({error:true})
    }
   }

  handleGMailSubmit(bodyData) {
    
 
    getData(
      "/logged",
      {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {
          "Content-Type": "application/json"
        }
      },
      responseData => console.log(responseData)
    );
  }

  render() {
    return (     
     <div>
      {this.state.isLogged ? <LoginSuccess {...this.props}/> : <div className=""></div>}
      {this.state.error ? <LoginError cleanForm={this.cleanForm }{...this.props}/> : <div className=""></div>}
        <div id={"logForm"}>
        <Form className={"col-8"}>
          <Form.Group controlId={"formBasicEmail"}>
            <Form.Control
              onChange={this.handleChange}
              value={this.state.username}
              type={"text"}
              name="username"
              placeholder={"Enter username"}
            />
          </Form.Group>
          <Form.Group controlId={"formBasicPassword"}>
            <Form.Control
              onChange={this.handleChange}
              value={this.state.password}
              type={"password"}
              name="password"
              placeholder={"Password"}
            />
          </Form.Group>
          <Button  onClick={event => this.handleSubmit(event)} variant="success" type="submit">
            Submit
          </Button>
          <GoogleLogin  className="rounded ml-2" 
              clientId="1083777488269-qtccrdu14cm0mhds2bo07tkuroik5ak7.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle => {
                const body= {
                    username: responseGoogle.profileObj.name,
                    email: responseGoogle.profileObj.email,
                    profilePicture: responseGoogle.profileObj.imageUrl
                
                }
                console.log(body);

               this.handleGMailSubmit(body)

              }}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}></GoogleLogin>
        </Form>
        </div>  
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
})

const mapStateToProps = state => {
  return {
    logged: state.user.logged
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(LogIn);