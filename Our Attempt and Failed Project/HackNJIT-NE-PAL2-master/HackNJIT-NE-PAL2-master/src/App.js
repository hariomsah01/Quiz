import React, { useState, useEffect } from "react";
import IMGdata from "./components/IMGdata";
import "./App.css";
import ImageMetadata from "./components/ImageMetadata";
import FileUpload from "./components/FileUpload";
import GetImg from "./components/GetImg";
import Login from "./components/Login";
import Register from "./components/Register";
// import axios from "axios";

function App() {
  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   // Replace 'http://localhost:3001/api' with your actual backend API URL
  //   axios
  //     .get("http://localhost:3001/api")
  //     .then((response) => {
  //       setData(response.data); // Store the response data in state
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []); // Empty dependency array to run the effect once
  // return (
  //   <div>
  //     <ImagesWithButton
  //       info={{
  //         src: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
  //         name: "cat",
  //       }}
  //     ></ImagesWithButton>
  //     <ImagesWithButton
  //       info={{
  //         src: "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_640.jpg",
  //         name: "cat2",
  //       }}
  //     ></ImagesWithButton>
  //     <ImagesWithButton
  //       info={{
  //         src: "https://img.freepik.com/free-photo/isolated-happy-smiling-dog-white-background-portrait-4_1562-693.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1697155200&semt=sph",
  //         name: "dog",
  //       }}
  //     ></ImagesWithButton>
  //     <h2>Response from Backend:</h2>
  //     <pre>{JSON.stringify(data, null, 2)}</pre>
  //   </div>
  // );
  return (
    <div className="feed">
      <IMGdata></IMGdata>
      <FileUpload></FileUpload>
      <GetImg></GetImg>
      <Login></Login>
      {/* <Register></Register> */}
    </div>
  );
}

export default App;
