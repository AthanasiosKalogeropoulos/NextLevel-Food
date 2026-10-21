"use client";

import { useState, useRef } from "react";
import styles from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const imageInput = useRef();
  const [pickedImage, setPickedImage] = useState(null);

  const handleClick = () => {
    imageInput.current.click();
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    if (!imageFile) {
      setPickedImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(imageFile);
  };
  return (
    <>
      <div className={styles.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={styles.controls}>
          <input
            ref={imageInput}
            className={styles.input}
            type="file"
            id={name}
            accept="image/png, image/jpeg"
            name="image"
            required
            onChange={handleImageChange}
          />

          <button className={styles.button} type="button" onClick={handleClick}>
            Pick an Image
          </button>

          {!pickedImage && <p style={{color: "#cb4848"}}>No image picked yet.</p>}
          {pickedImage && (
            <div className={styles.preview}>
              <Image
                src={pickedImage}
                alt="The image selected by the user"
                fill
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
