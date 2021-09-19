import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {db, storage} from './firebase';
import Avatar from 'react-avatar';
import './ImageUpload.css';


class ImageUpload extends Component{
    state={
        image:null,
        caption:'',
        openUpload:false
    }

    setCaption = (e)=>{
        this.setState({
            caption:e.target.value
        })        
    }

    showUpload = ()=>{
        this.setState({
            openUpload:!this.state.openUpload
        })
    }

    handleChange = (e) => {
        var currentImage = e.target.files[0];
        this.setState({ image: currentImage }); 
    }

    handleUpload = (e) => {
        e.preventDefault();
        // This is what uploads the image to Firebase
        const image = this.state.image;
        const caption = this.state.caption;
        const username = this.props.username;
    if(image && caption && username){ 
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot)=>{console.log(snapshot)},
            (error) => {
                // Error function
                alert("error");
                console.log(error);
            },
            () => {
                // complete function ...
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // Post image URL inside db
                        db.collection("images").add({
                            // timestamp is used here to figure out the time the image was uploaded, which is gonna determine the order in which we display the posts (latest at the top)
                            caption: caption,
                            imageUrl: url,
                            username: username,
                            imagename: image.name
                        });

                    })
                     this.setState({
                         image:null,
                         caption:'',
                         openUpload:false
                     })
            }
        )} else{alert("Complete form")}
    }
    render(){
	return(
        <div>

            <Modal show={this.state.openUpload} onHide={this.showUpload} >
                 <Modal.Body>
                    <div>
                    <form className="uploadModal">
                        <input type="file" onChange={this.handleChange}/>
                        <input type="text" placeholder="caption" value={this.state.caption} onChange={this.setCaption} required/>
                        <Button onClick={this.handleUpload}>Submit</Button>
                    </form>
                    </div>
                </Modal.Body>
            </Modal>

            <div className="userContainer">
            	{this.props.user ? (<div><Avatar className="avatar" name={this.props.username} textSizeRatio='3' size="40" round={true}/>
                    <Button className="upload" variant="outline-dark" onClick={this.showUpload}>Upload Image</Button></div>)
            		  : (<p>Please Sign In</p>)
            	}
            </div>
        </div>
    )
}
}
export default ImageUpload;
