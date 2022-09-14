import "./Register.css"
import axios from 'axios'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {baseUrl} from '../../Shared/baseUrl'

const Swal = window.Swal

class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: null, 
            created: false, 
            validEmail: false,
            validPassword: false
        }
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleInputBlur = (event) => {
        if(event.target.name === "email")
        {
            this.toggleValidationStyle(event, "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")
        }
        else if(event.target.name === "password")
        {
            this.toggleValidationStyle(event, "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")
        }
    }

    toggleValidationStyle = (event, format) => 
    {
        if (!event.target.value.match(format) && event.target.value !== null)
        {
            event.target.parentElement.classList.add('invalid');
            if(event.target.parentElement.classList.contains('valid'))  // sanity check
            {
                event.target.parentElement.classList.remove('valid');
            }
            if(event.target.name === 'email') {
                this.setState({...this.state, validEmail: false})
            } else if(event.target.name === 'password') {
                this.setState({...this.state, validPassword: false})
            }
        }
        else
        {
            event.target.parentElement.classList.remove('invalid');
            event.target.parentElement.classList.add('valid');
            if(event.target.name === 'email')
            {
                this.setState({...this.state, validEmail: true})
            }
            else if(event.target.name === 'password') 
            {
                this.setState({...this.state, validPassword: true})
            }
        }
    }

    /** @todo validate password and email formatting before submission*/
    handleSubmit = (event) => {
        event.preventDefault()
        const data = {username: this.state.username, email: this.state.email, password: this.state.password, confirmPassword: this.state.confirmPassword, role: 'USER'}
        if(this.state.password === this.state.confirmPassword)
        {
            axios.post(baseUrl + "/register", data)
            .then(response => {
               if (response.status <= 202) 
               {
                    // this.clearFields()
                    // Swal.fire({
                    //     icon: 'success',
                    //     title: 'Successfully Registered!',
                    //     showConfirmButton: false,
                    //     timer: 1500
                    //   })
                    // window.location = '/login';
                    this.setState({...this.state, created: true})
               }
            })
            .catch(err => {
                if (err.response !== undefined) 
                {
                    this.setState({...this.state, error: err.response.data.message})
                    Swal.fire({
                        icon: 'error',
                        title: this.state.error,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        }
        else
        {
            //alert("Password and Confirm Password must match!!!")
            Swal.fire({
                icon: 'error',
                title: 'Password and Confirm Password must match!!!',
                showConfirmButton: false,
                timer: 1500
            })
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
            {this.state.created ? 
                <div className="register-container success-screen">
                    <h1 className="register-title font-effect-emboss">Account Created!</h1>
                    <Link to="/login" ><button className="btn">Go to Sign In</button></Link>
                </div>
            :
                <div className="register-container">
                    <h1 className="register-title font-effect-emboss">Create Account</h1>
                    <form className="form">
                        <div className={this.state.error === "User Already Exists." ? "input-group invalid" : "input-group"}>
                            <label className="sr-only">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                v-model="user.username"
                                onChange={this.handleInputChange}
                                required
                            />
                            {this.state.error === "User Already Exists." && <div className="msg">{this.state.error}</div>}
                        </div>

                        <div className="input-group">
                            <input 
                                type="email"
                                id="email"
                                name="email"
                                placeholder='E-mail Address'
                                v-model="user.email"
                                onChange={this.handleInputChange}
                                required
                                onBlur={this.handleInputBlur}
                            />
                        </div>
                        
                        <div className="input-group">
                            <label className="sr-only">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                v-model="user.password"
                                onChange={this.handleInputChange}
                                required
                                onBlur={this.handleInputBlur}
                            />
                        </div>

                        <div className={this.state.password === '' ? "input-group" : this.state.password === this.state.confirmPassword ? "input-group valid" : "input-group  invalid"}>
                            <input
                                type="password"
                                id="password-confirm"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                v-model="user.password"
                                onChange={this.handleInputChange}
                                required
                                onBlur={this.handleInputBlur}
                            />
                            {this.state.password === this.state.confirmPassword ? <div className="msg"></div> : <div className="msg">Password and Confirm Password must match!!!</div>}
                        </div>
                        <Link to="/login" className="login-link">Have an account?</Link>
                        <button 
                            className="btn" 
                            type="submit" 
                            disabled={!this.state.validEmail || !this.state.validPassword} 
                            onClick={this.handleSubmit}>
                        Register
                        </button>
                    </form>
                </div>
            }
            </div>
        )
    }
}

export default Register;