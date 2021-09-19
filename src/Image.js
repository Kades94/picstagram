import React, { Component } from 'react';
import './Image.css';
import { BsFillHeartFill } from "react-icons/bs";
import { Modal } from 'react-bootstrap';
import Avatar from 'react-avatar';

class Image extends Component {
    state={
        count:0,
        clicked:false
    }

    updateLike= ()=> {
        var likes=this.state.count;
        if(this.state.clicked){
            likes--;

        } else{
            console.log(this.props.posts);
            likes++;
        }
        this.setState({
            count: likes,
            clicked:!this.state.clicked
        })
    }

    render() {
    	return(
        <div className="image">
            <div className="imageHeader"><div><Avatar name={this.props.username} size="30" round={true}/></div><div>{this.props.username}</div></div>
            <div className="imageBody"><img className="postImage" onClick={this.lightBox} src={this.props.imageUrl}/></div>
            <div className="imageFooter">     
                <strong>{this.props.username}:</strong> {this.props.caption} 
                <div className="count" onClick={this.updateLike}><BsFillHeartFill className="like"/> {this.state.count} likes</div>
            </div>
        </div>
        )     
    }
}
export default Image;