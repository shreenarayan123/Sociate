import React, { useState, useRef, useEffect } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/UploadAction";
import Picker from "emoji-picker-react";
import { UilGrin } from "@iconscout/react-unicons";

const PostShare = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setInputStr((prevInput) => prevInput + event.emoji);
  };
  const desc = useRef();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // handle Image Change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const imageRef = useRef();

  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();

    //post data
    const newPost = {
      userId: user._id,
      desc: desc.current.value + inputStr,
    };

    // if there is an image with post
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;
      console.log(newPost);
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(uploadPost(newPost));
    resetShare();
  };

  // Reset Post Share
  const resetShare = () => {
    setImage(null);
    desc.current.value = "";
  };
  return (
    <div className="PostShare">
      
     <div className="head">
      
     <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="Profile"
        />
        
     

      
        <input
          type="text"
          placeholder="What's happening?"
          required
          ref={desc}
        />
      
     </div>
      <div className="post-options">
      <div className="p-actions">
      <div className="option" onClick={() => imageRef.current.click()}>
          +
        </div>

        <div className="picker-container" style={{height:"3rem"}}>
          

          <UilGrin onClick={() => setShowPicker((val) => !val)} />
          {showPicker && (
            <Picker
              pickerStyle={{ width: "100%"}}
              onEmojiClick={onEmojiClick}
            />
          )}
        </div>
      </div>
        <button
          className="button ps-button"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "uploading" : "Share"}
        </button>

        <div style={{ display: "none" }}>
          <input type="file" ref={imageRef} onChange={onImageChange} />
        </div>
      </div>

      {image && (
        <div className="previewImage">
          <UilTimes onClick={() => setImage(null)} />
          <img src={URL.createObjectURL(image)} alt="preview" />
        </div>
      )}
    </div>
  );
};

export default PostShare;
