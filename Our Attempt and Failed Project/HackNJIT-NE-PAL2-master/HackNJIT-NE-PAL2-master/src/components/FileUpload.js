import React, { useState } from "react";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [geo, setGeo] = useState(null);

  const handleGeolocation = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const geoData = { latitude, longitude };
    setGeo(geoData);
  };

  const handleGeolocationError = (error) => {
    console.error("Geolocation error:", error.message);
  };

  const GetGeo = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        handleGeolocation,
        handleGeolocationError
      );
    } else {
      alert("Geolocation is not available in this browser.");
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    GetGeo();
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      if (geo) {
        // Include latitude and longitude in the form data
        formData.append("latitude", geo.latitude);
        formData.append("longitude", geo.longitude);
      }

      fetch("http://localhost:3001/SendPic", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("File upload failed");
          }
        })
        .then((data) => {
          console.log("File uploaded successfully:", data);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        })
        .finally(() => {
          setFile(null);
        });
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <button id="getLocationButton" onClick={GetGeo}>
        Get My Location
      </button>
    </div>
  );
}

export default FileUpload;
