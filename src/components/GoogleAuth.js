import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    //state = { isSignedIn: null };

    onAuthChange = (isSignedIn) => {
        //this.setState({ isSignedIn: this.auth.isSignedIn.get()});
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '907651485393-9ngl3otvalfsmckqa1lkgqjd1hc3d2f0.apps.googleusercontent.com',
                scope: 'email',
                plugin_name: "streamy",
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                //could just call this.onAuthChange(); here
                //this.setState({ isSignedIn: this.auth.isSignedIn.get()});
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    };

    renderAuthButton() {
        //if (this.state.isSignedIn === null) {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    };

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    };
};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn};
};

export default connect(mapStateToProps, {
    signIn, signOut
})(GoogleAuth);