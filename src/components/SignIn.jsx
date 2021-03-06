import React, { Component } from "react";
import {
  signInWithGoogle,
  auth,
  updateDisplayNameCurrentUser,
} from "../firebase";

class SignIn extends Component {
  state = { email: "", password: "" };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((data) => {
        if (data.user) updateDisplayNameCurrentUser(data.user.uid);
        this.setState({ email: "", password: "" });
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);

        // ...
      });
  };

  render() {
    const { email, password } = this.state;

    return (
      <form className="SignIn" onSubmit={this.handleSubmit}>
        <h2>Sign In</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.handleChange}
        />
        <input type="submit" value="Sign In" />
        <button onClick={signInWithGoogle}>Sign In With Google</button>
      </form>
    );
  }
}

export default SignIn;
