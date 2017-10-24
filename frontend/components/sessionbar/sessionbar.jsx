import React from 'react';

class SessionBar extends React.Component {
  constructor(props) {
    super(props);
  }

  sessionButton() {
    const buttonText = this.props.loggedIn ?  "Log Out" : "Sign Up";
    const buttonAction = this.props.loggedIn ?
      e => this.props.logout()
      : e => this.props.history.push("/signup");

    return (
      <button onClick={buttonAction}>{buttonText}</button>
    );
  }

  render() {
    return (
      <header className="session-bar">
        <h1>EasyFeeds</h1>
        {this.sessionButton()}
      </header>
    );
  }
}

export default SessionBar;
