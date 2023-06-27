import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [state, setState] = useState([
    {
      title: "제목1",
      contents: "내용1",
      isDone: false,
      id: uuidv4(),
    },
  ]);

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  // 제목 필드 변경
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  // 내용 필드 변경
  const handleContentsChange = (e) => {
    setContents(e.target.value);
  };

  // 추가 버튼
  const handleSubmitClick = (e) => {
    e.preventDefault();
    const newTodo = {
      title: title,
      contents: contents,
      isDone: false,
      id: uuidv4(),
    };
    setState([...state, newTodo]);
    setTitle("");
    setContents("");
  };

  // 삭제 버튼
  const handleDeleteClick = (id) => {
    setState((prev) => prev.filter((t) => t.id !== id));
  };
  // 완료, 취소 버튼
  const handleSwitchClick = (id) => {
    setState((prev) =>
      //취소눌렀을때 투두를바꾼다 전에있는 값을불러와서 map 함수로 돌려준다
      //티에 담는다 t.id 전에있는 값이랑 클릭한 아이디 값이 같으면 전에있던 애들 그대로 복사 거기에 is done이라는 애들을 반대로
      //아닌애들을 그냥 그대로 반환
      prev.map((t) => {
        if (t.id === id) {
          return { ...t, isDone: !t.isDone };
        } else {
          return t;
        }
      })
    );
  };

  return (
    <section className="App">
      <header className="header">황재중 TodoList</header>
      <main>
        <section className="inputfield">
          {/* // input 부분 */}
          <form onSubmit={handleSubmitClick}>
            제목{" "}
            <input type="text" value={title} onChange={handleTitleChange} />
            내용{" "}
            <input
              type="text"
              value={contents}
              onChange={handleContentsChange}
            />
            <button className='add'>추가하기</button>
          </form>
        </section>
        <div>
          {/* // 리스트 카드 */}
          <h4>진행중</h4>
          <div>
            {state
              .filter((item) => !item.isDone)
              .map((item) => {
                return (
                  <div className='item' key={item.id}>
                    <h5>{item.title}</h5>
                    <p>{item.contents}</p>
                    <section className='button-group'>
                    <button className='suc-button' onClick={() => handleSwitchClick(item.id)}>
                      {item.isDone ? "취소" : "완료"}
                    </button>{" "}
                    <button className='del-button' onClick={() => handleDeleteClick(item.id)}>
                      삭제
                    </button>
                    </section>
                  </div>
                );
              })}
          </div>
          <h4>완료</h4>
          <div>
          {state
            .filter((item) => item.isDone)
            .map((item) => {
              return (
                <div className='item' key={item.id}>
                  <h5>{item.title}</h5>
                  <p>{item.contents}</p>
                  <section className='button-group'>
                  <button className='suc-button' onClick={() => handleSwitchClick(item.id)}>
                    {item.isDone ? "취소" : "완료"}
                  </button>
                  <button className='del-button' onClick={() => handleDeleteClick(item.id)}>
                    삭제
                  </button>
                  </section>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </section>
  );
}
export default App;
