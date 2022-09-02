import "./Register.css"
import axios from 'axios'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {baseUrl} from '../../Shared/baseUrl'

class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            created: false,
            error: null,
        }
        
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const data = {username: this.state.username, email: this.state.email, password: this.state.password, confirmPassword: this.state.confirmPassword, role: 'USER'}
        if(this.state.password === this.state.confirmPassword){
            axios.post(baseUrl + "/register", data)
            .then(response => {
               if (response.status <=202) 
               {
                    this.setState({...this.state, created: true})
                    this.clearFields()
                    window.location = '/login';
                    console.log("here")
               }
            })
            .catch(err => {
                if (err.response != undefined) 
                {
                    this.setState({...this.state, error: err.response.data.message})
                }
            })
            
        }else{
            alert("Password and Confirm Password must match!!!")
            //add red border on password confirmation by setting secondary class to invalid 
        }

    }

    clearFields = () => {
        var inputs = document.getElementsByTagName("input");
        for(var i=0;i<inputs.length;i++)
            inputs[i].value = '';
    }

    render(){
        return(
                <div className="fullscreen-container">
                    <div className="register-container">
                        <h1 className="register-title font-effect-emboss">Create Account</h1>
                        <form className="form">
                            <div className="input-group">
                                <label className="sr-only">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    //class="form-control"
                                    placeholder="Username"
                                    v-model="user.username"
                                    onChange={this.handleInputChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <input 
                                    type="email"
                                    id="email"
                                    name="email"
                                    //class="form-control"
                                    placeholder='E-mail Address'
                                    v-model="user.email"
                                    onChange={this.handleInputChange}
                                    required
                                    pattern="[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,}"
                                />
                            </div>
                            
                            <div className="input-group">
                                <label className="sr-only">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    //class="form-control"
                                    placeholder="Password"
                                    v-model="user.password"
                                    onChange={this.handleInputChange}
                                    required
                                    pattern="[a-zA-Z0-9]{8,}"
                                />
                            </div>

                            <div className="input-group">
                                <input
                                    type="password"
                                    id="password-confirm"
                                    name="confirmPassword"
                                    //class="form-control"
                                    placeholder="Confirm Password"
                                    v-model="user.password"
                                    onChange={this.handleInputChange}
                                    required
                                />
                                {this.state.error !== null && <div>{this.state.error}</div>}
                            </div>
                                <Link to="/login" className="login-link">Have an account?</Link>
                                <button className="btn" type="submit" onClick={this.handleSubmit}>Register</button>
                        </form>
                    </div>
                </div>
        )
    }
}

export default Register;