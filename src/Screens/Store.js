import React from "react";
import firebase from "../firebase";
import { storage } from "firebase";
import { imagePath } from "../firebase";
import { firestore } from "../firebase";

function Store() {
  var fbStorage = storage();
  var storageRef = fbStorage.ref();
  var storeRef = storageRef.child("Store");
  var musicRef = storageRef.child("Music");
  var gsRef = fbStorage.refFromURL(imagePath);
  var sheetRef = storeRef.child("2.png");

  const testFireStore = () => {
    firestore
      .collection("1Sheet")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.get("songName")}`);
        });
      });
  };

  const fileDown = () => {
    musicRef
      .child("새벽의 끝(The end of Dawn).mp3")
      .getDownloadURL()
      .then(function (url) {
        console.log(url);
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function (event) {
          var blob = xhr.response;
          saveOrOpenBlob(blob, url);
        };
        xhr.open("GET", url);
        xhr.send();
      })
      .catch(function (error) {
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            console.log("File doesn't exist");
            break;
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            console.log("File doesn't exist");
            break;
          case "storage/canceled":
            // User canceled the upload
            console.log("File doesn't exist");
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            console.log("File doesn't exist");
            break;
        }
      });
  };

  function saveOrOpenBlob(blob, url) {
    var fileName = "새벽의 끝(The end of Dawn).mp3";
    var tempEl = document.createElement("a");
    document.body.appendChild(tempEl);
    tempEl.style = "display: none";
    url = window.URL.createObjectURL(blob);
    tempEl.href = url;
    tempEl.download = fileName;
    tempEl.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <>
      <body>
        <button
          class="waves-effect waves-light btn-large col s12"
          onClick={fileDown}
        >
          따운로드
        </button>
        <button
          class="waves-effect waves-light btn-large col s12"
          onClick={testFireStore}
        >
          가져오기
        </button>
      </body>
    </>
  );
}

export default Store;
