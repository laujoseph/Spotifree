import React from "react";
import Login from "./Login";
import MainPage from "./MainPage"


// Getting the portion of the code in the URL after the question mark
const code = new URLSearchParams(window.location.search).get("code")

function App() {
  return code ? <MainPage code={code} /> : <Login />
}

export default App;
