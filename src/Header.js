import './Header.css';
import React, {Component} from 'react';
import { Button, Modal } from 'react-bootstrap';
import ImageUpload from './ImageUpload';

class Header extends Component {

    render() {
    	return(
			<div className="nav">
          <div className="title">
    			 Picstagram
          </div>

          <div className="buttonContainer">
            {this.props.user ? (
              <div>
                <Button variant="dark" className="signOut" onClick={this.props.signOut}>Sign Out</Button>
              </div> )
            : (
            <div>
              <Button  variant="dark" className="signUp" onClick={()=>this.props.showSignUp(true)}>Sign Up</Button>
              <Button  variant="outline-dark" className="login" onClick={()=>this.props.showLogin(true)}>Log In</Button>
            </div>)
            }
          </div>
			</div>
    	)
    }
}
export default Header;