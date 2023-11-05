import React, { useState } from "react";

function GetImg() {
  const [imageId, setImageId] = useState(""); // Set the image ID here

  const handleImageFetch = async () => {
    // Fetch the image by ID from the server
    try {
      const response = await fetch(`http://localhost:3001/image/${imageId}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        console.log(url);
        document.getElementById("imageElement").src = url; // Set the image source
      } else {
        console.error("Error fetching image");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  // mongodb+srv://sherpatsewang01:ECHryDFP638LfSmU@cluster0.ysdlj2q.mongodb.net/?retryWrites=true&w=majority
  return (
    <div>
      <input
        type="text"
        placeholder="Image ID"
        value={imageId}
        onChange={(e) => setImageId(e.target.value)}
      />
      <button onClick={handleImageFetch}>Fetch Image</button>
      <br />
      <img id="imageElement" src="" alt="Fetched Image" />
    </div>
  );
}

export default GetImg;
