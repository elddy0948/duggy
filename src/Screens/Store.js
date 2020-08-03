import React from "react";
import firebase from "../firebase";
import { storage } from "firebase";

function Store() {
  var fbStorage = storage();
  var storageRef = fbStorage.ref();
  var storeRef = storageRef.child("Store");
  var gsRef = fbStorage.refFromURL("gs://duggy-music.appspot.com/Store/2.png");
  var sheetRef = storeRef.child("2.png");

  function fileDown() {
    gsRef
      .getDownloadURL()
      .then(function (url) {
        var xhr = new XMLHttpRequest();
        console.log(url);
        console.log("Hello!");
        xhr.responseType = "blob";
        xhr.onload = function (event) {
          var blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        var img = document.getElementById("myimg");
        img.src = url;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  console.log(sheetRef.fullPath);

  return (
    <>
      <body>
        <h1>{sheetRef.fullPath}</h1>
        <button
          class="waves-effect waves-light btn-large col s12"
          onClick={fileDown}
        ></button>
      </body>
    </>
  );
}

export default Store;
