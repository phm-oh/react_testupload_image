import React, { useState } from 'react';
import axios from 'axios';
import './ImageUploadcss.css';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('image/nopic.png');
  const [uploading, setUploading] = useState(false);

  const handleImageChange =  (event) => {

    
    const image = event.target.files[0];
     setSelectedImage(image);
    // console.log(image)
   // เช็คค่า selectImage ว่ามีไหม //ข้อสังเกตุทำรูปแรกไม่ยอมขึ้นว่ามี แต่ใช้งานได้ปกติ
    if(selectedImage ){
      console.log('มี')
    }else{  console.log('ว่าง')  }   
    

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
      //  console.log(previewImage)   //แสดง path ปกติ
      //  console.log(reader.result) // แสดงเป็นรูปแบบ base64
    };
    
    reader.readAsDataURL(image);
    console.log(image)
   
  
  };

  const handleUpload = async () => {
 
    if(selectedImage ){
      console.log('มี')
    }else{  console.log('ว่าง')  }

    if (selectedImage) {
      setUploading(true);
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage); 
      reader.onload = async () => {
        const base64Image = reader.result.split(',')[1];

        try {
          const response = await axios.post('http://127.0.0.1/img', {
            image: base64Image,
          });

          console.log('Image uploaded:', response.data);
        } catch (error) {
         console.error('Error uploading image:', error);
        }

        setUploading(false);
      };
    }
  };

  return (
    <div className="image-upload-container">
      <h2>Modern Image Upload</h2>
      <div className="image-preview">
        {previewImage && <img src={previewImage} alt="Preview" />}
      </div>
      <label className="file-input-label">
        <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
        Choose Image
      </label>
      <button onClick={handleUpload} className="upload-button" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default ImageUpload;
