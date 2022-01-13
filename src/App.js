import React, { Fragment } from "react";
import Header from "./layout/Header";
import "./app.scss";
import Meals from "./meals/Meals";
function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
