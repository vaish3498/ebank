import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    pin: '',
    userId: '',
    success: false,
    errorMsg: '',
  }

  getUserId = event => {
    this.setState({userId: event.target.value})
  }

  getPin = event => {
    this.setState({pin: event.target.value})
  }

  successLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  failureLogin = errorMsg => {
    this.setState({
      success: false,
      errorMsg,
    })
  }

  bankLogin = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'

    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok === true) {
      this.successLogin(data.jwt_token)
    } else {
      this.failureLogin(data.error_msg)
    }
  }

  render() {
    const {userId, pin, success, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-container">
        <div className="login-container">
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="website-login"
            />
          </div>
          <form className="login-form" onSubmit={this.bankLogin}>
            <h1 className="heading">Welcome Back</h1>
            <div className="input-container">
              <label className="label" htmlFor="user">
                User ID
              </label>
              <input
                type="text"
                id="user"
                value={userId}
                className="input"
                onChange={this.getUserId}
                placeholder="Enter User ID"
              />
            </div>
            <div className="input-container">
              <label className="label" htmlFor="pin">
                PIN
              </label>
              <input
                type="password"
                id="pin"
                value={pin}
                className="input"
                onChange={this.getPin}
                placeholder="Enter Pin"
              />
            </div>
            <button className="button" type="submit">
              Login
            </button>
            <div className="error-msg">
              {success === true && <p className="para">{errorMsg}</p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
