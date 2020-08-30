import React, { useState, useEffect } from "react";
import "../App.css";
import "../sass/materialize.scss";
import { firestore, auth } from "../firebase";
import { makeArray } from "jquery";

const Cart = () => {
  const [userEmail, setUserEmail] = useState("");
  const [scores, setScores] = useState([]);
  const [sheets, setSheets] = useState([]);

  // useEffect 는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정 할 수 있는 Hook
  // 클래스형 컴포넌트의 componentDidMount 와 componentDidUpdate 를 합친 형태로 보아도 무방

  // mount될 때 한번만 실행하고 싶을 때 ==> []
  // 특정 값이 변경될 때 실행 ==> [특정 값]
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        //User is signed in.
        setUserEmail(user.email);
        console.log("User Signed In");
        firestore.collection("Users").onSnapshot((doc) => {
          doc.forEach((field) => {
            if (field.get("Email") === user.email) {
              field.get("cart_score").forEach((score) => {
                setScores((scores) => [
                  ...scores,
                  <tr>
                    <td>{score}</td>
                    <td>2000원</td>
                    <td>
                      <button>삭제</button>
                    </td>
                  </tr>,
                ]);
              });
              field.get("cart_sheet").forEach((sheet) => {
                setSheets((sheets) => [
                  ...sheets,
                  <tr>
                    <td>{sheet}</td>
                    <td>1000원</td>
                    <td>
                      <button>삭제</button>
                    </td>
                  </tr>,
                ]);
              });
            }
          });
        });
      } else {
        //No user is signed in.
        console.log("No User Signed In");
      }
    });
  }, []);

  const returnScore = () => {
    return scores.map((score) => (
      <tr>
        <td>{score}</td>
        <td>2000원</td>
        <td>
          <button>삭제</button>
        </td>
      </tr>
    ));
  };
  const returnSheet = () => {
    return sheets.map((sheet) => (
      <tr>
        <td>{sheet}</td>
        <td>1000원</td>
        <td>
          <button>삭제</button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <body>
        <div>
          <h3 className="center-align">악보</h3>
          <table className="centered">
            <thead>
              <tr>
                <th>Song Name</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score) => {
                return score;
              })}
            </tbody>
          </table>
        </div>
        <div>
          <h3 className="center-align">음원</h3>
          <table className="centered">
            <thead>
              <tr>
                <th>Song Name</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {sheets.map((sheet) => {
                return sheet;
              })}
            </tbody>
          </table>
        </div>
      </body>
    </>
  );
};

export default Cart;
