import "./Login.css"
import { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {addToken, addUser} from '../../Redux/actionCreators'
import {baseUrl} from '../../Shared/baseUrl'
import axios from 'axios'


const mapDispatchToProps = (dispatch) => ({
    addToken: () =>  dispatch(addToken()),
    addUser: () => dispatch(addUser()) 
});

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleLogin = async (e) => {
        e.preventDefault()
        const data = { username: this.state.username, password: this.state.password };

        const userWithToken = await axios.post(baseUrl + '/login', data)

        await this.props.dispatch(addToken(userWithToken.data.token))
        await this.props.dispatch(addUser(userWithToken.data.user));
        sessionStorage.setItem("token", userWithToken.data.token);
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
                <div className="fullscreen-container">
                    <div className="login-container">
                        <h1 className="login-title font-effect-emboss">Please Sign In</h1>
                        <form className="form" onSubmit={this.handleLogin}>
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
                                <span className="msg">Incorrect Password</span>
                            </div>

                            <Link to="/register" className="register-link">Need an account?</Link>
                            <button className="btn" type="submit">Sign in</button>
                        </form>
                    </div>
                </div>
        )
    }
}
/*<a href="https://www.freepik.com/free-photo/order-food-table-empty-background_1066970.htm#page=3&query=background%20restaurant&position=26&from_view=search">Image by tirachard</a> on Freepik */
export default withRouter(connect(mapDispatchToProps)(Login));
