import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Box } from "./Example";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useRecoilRefresher_UNSTABLE,
  DefaultValue,
} from "recoil";
import { useMount } from "react-use";
import React, { useState } from "react";
const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
interface User {
  userName: string;
  userId: string;
}

const userState = atom<Partial<User>>({
  key: "userState",
  default: {},
});

function WithLogin(WrappedComponent: any): JSX.Element {
  const user = useRecoilValue(userState);
  // if (!user.userName) {
  //   return alert("请先登陆");
  // }
  console.log("user", user);
  console.log(WrappedComponent.props.onClick);
  return (props: any) => {
    console.log("props", props);
    return <WrappedComponent {...props} />;
  };
}
function App() {
  const [user, setUser] = useRecoilState(userState);
  useMount(() => {
    localStorage.getItem("user") &&
      setUser(JSON.parse(localStorage.getItem("user") as string));
  });
  const login = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        userName: "TinsFox",
        userId: "123",
      })
    );
    setUser({
      userName: "TinsFox",
      userId: "123",
    });
  };
  const logout = () => {
    localStorage.clear();
    setUser({});
  };
  const test = () => {
    console.log("test");
    window.open("https://www.baidu.com");
  };
  return (
    <div className="App">
      <div>用户信息{JSON.stringify(user)}</div>
      <button onClick={logout}>登出</button>
      <button onClick={login}>登陆</button>
      <button>我需要登陆访问</button>
      {WithLogin(<button onClick={test}>我需要登陆访问</button>)}
    </div>
  );
}

export default App;
