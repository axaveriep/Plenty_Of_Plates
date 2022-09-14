import { Component } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import EventPage from '../EventPage/EventPage'
import Home from '../Home/Home'
import Navbar from '../Navbar/Navbar'
import { addToken, deleteUser } from '../../Redux/actionCreators'
import { connect } from 'react-redux'
import UserProfile from "../UserProfile/UserProfile"


const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToken: () => { dispatch(addToken()) },
    deleteUser: () => { dispatch(deleteUser()) }
});

class Main extends Component {
    // constructor(props) {
    //     super(props);
    // }

    handleLogout = () => {
        this.props.addToken("")
        this.props.deleteUser()
    }

    render() {
        return (
            <div>
                {this.props.token.token !== undefined ?
                    <div>
                        <Navbar handleLogout={this.handleLogout} />
                        <Redirect to='/home' />
                    </div>
                    :
                    <><Redirect to='/login' /></>
                }
                <Switch>
                    <Route path='/login'
                        component={Login}
                    />
                    <Route path='/register'
                        component={Register}
                    />
                    <Route path='/eventpage'
                        component={EventPage}
                    />
                    <Route path='/home'
                        component={()=> <Home username={this.props.user.username} />}
                    />
                    <Route path='/userprofile'
                        component={()=> <UserProfile username={this.props.user.username} />}
                    />

                    {/* <Redirect to='/home' /> */}

                </Switch>
            </div>
        )
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));