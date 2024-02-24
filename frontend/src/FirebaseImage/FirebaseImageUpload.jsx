import React, { useEffect, useState } from "react";
import { imageDb } from './Config';
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function FirebaseImageUpload() {
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState('');

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImg(selectedImage);
      uploadImage(selectedImage);
    }
  };

  const uploadImage = (image) => {
    const imgRef = ref(imageDb, `files/${v4()}`);
    uploadBytes(imgRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImgUrl(url);
      });
    });
  };
  console.log(">>>>>", imgUrl)
  return (
    <div className="App">
      <input type="file" onChange={handleImageChange} />
    </div>
  );
}

export default FirebaseImageUpload;
