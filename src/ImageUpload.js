import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {db, storage} from './firebase';
import './ImageUpload.css';
import {Link} from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";

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
        {/*upload image to firebase*/}
        const image = this.state.image;
        const caption = this.state.caption;
        const username = this.props.username;
        const user =this.props.user;
    if(image && caption && username){ 
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot)=>{console.log(snapshot)},
            (error) => {
                alert("error");
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("images").add({
                            caption: caption,
                            imageUrl: url,
                            username: username,
                            imagename: image.name,
                            timestamp:Date().toLocaleString(),
                            uid:user.uid
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
            <Modal show={this.state.openUpload} onHide={this.showUpload} centered>
                <div className="uploadModal">
                    <form>
                        <input type="file" onChange={this.handleChange}/>
                        <input type="text" placeholder="caption" value={this.state.caption} onChange={this.setCaption} maxlength="50" required/>
                        <Button onClick={this.handleUpload}>Submit</Button>
                    </form>
                </div>
            </Modal>

            <div className="userContainer">
            	{this.props.user ? (<div>
                    <span className={this.props.guest ? "guest" : "upload"} ><BsPlusCircle style={{fontSize:'30px'}} onClick={this.showUpload}/></span></div>)
            		: (<p>Please Sign In</p>)
            	}
            </div>
        </div>
    )
}
}
export default ImageUpload;
