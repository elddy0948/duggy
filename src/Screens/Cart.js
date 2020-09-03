import React, { useState, useEffect } from "react";
import "../App.css";
import "../sass/materialize.scss";
import { firestore, auth } from "../firebase";

// TODO
// 1. 장바구니 삭제 구현
// 2. 총 금액 계산
// 3. 구매버튼 구현

const Cart = () => {
  const [scores, setScores] = useState([]);
  const [sheets, setSheets] = useState([]);
  const [scoreTotal, setScoreTotal] = useState(0);
  const [sheetTotal, setSheetTotal] = useState(0);

  // useEffect 는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정 할 수 있는 Hook
  // 클래스형 컴포넌트의 componentDidMount 와 componentDidUpdate 를 합친 형태로 보아도 무방

  // mount될 때 한번만 실행하고 싶을 때 ==> []
  // 특정 값이 변경될 때 실행 ==> [특정 값]
  const bringScore = () => {
    const items = [];
    firestore
      .collection("Users")
      .get()
      .then((doc) => {
        doc.forEach((field) => {
          if (field.get("Email") === auth.currentUser.email) {
            field.get("cart_score").forEach((score) => {
              items.push(score);
            });
          }
        });
        setScores(items);
        setScoreTotal(items.length * 2000);
      });
  };

  const bringSheet = () => {
    const items = [];
    firestore
      .collection("Users")
      .get()
      .then((doc) => {
        doc.forEach((field) => {
          if (field.get("Email") === auth.currentUser.email) {
            field.get("cart_sheet").forEach((sheet) => {
              items.push(sheet);
            });
          }
        });
        setSheets(items);
        setSheetTotal(items.length * 1000);
      });
  };

  useEffect(() => {
    bringScore();
  }, []);

  useEffect(() => {
    bringSheet();
  }, []);

  const removeScore = (item) => {
    const items = scores.filter((score) => score !== item);

    firestore
      .collection("Users")
      .get()
      .then((doc) => {
        doc.forEach((field) => {
          if (field.get("Email") === auth.currentUser.email) {
            firestore
              .collection("Users")
              .doc(field.id)
              .update({ cart_score: items });
          }
        });
      });
    return setScores(items);
  };

  const removeSheet = (item) => {
    const items = sheets.filter((sheet) => sheet !== item);
    firestore
      .collection("Users")
      .get()
      .then((doc) => {
        doc.forEach((field) => {
          if (field.get("Email") === auth.currentUser.email) {
            firestore
              .collection("Users")
              .doc(field.id)
              .update({ cart_sheet: items });
          }
        });
      });
    return setSheets(items);
  };

  const requestKakaoPay = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: "KakaoAK " + process.env.APP_ADMIN_KEY,
      },
      form: {},
    };
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
                return (
                  <tr>
                    <td>{score}</td>
                    <td>2,000원</td>
                    <td>
                      <button
                        onClick={() => {
                          removeScore(score);
                        }}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                );
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
                return (
                  <tr>
                    <td>{sheet}</td>
                    <td>1,000원</td>
                    <td>
                      <button
                        onClick={() => {
                          removeSheet(sheet);
                        }}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="center-align">
          <h3>Total : {scoreTotal + sheetTotal}원</h3>
          <button>결제하기</button>
        </div>
      </body>
    </>
  );
};

export default Cart;
