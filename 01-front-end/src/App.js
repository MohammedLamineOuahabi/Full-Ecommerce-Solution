import React from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage";
import ShopPage from "./pages/shop/shop";
import Header from "./components/header/header";
import { Switch, Route } from "react-router-dom";

const ReactJSPage = () => (
  <div>
    <h1>react page</h1>
  </div>
);
const ReactJSBookPage = props => (
  <div>
    <h1>A react Book page : {props.match.params.bookId}</h1>
  </div>
);

function App() {
  return (
    <div>
      <Header />
      <Switch>
        {/*   using Switch to render only route that match   */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route exact path="/html" component={ReactJSPage} />
        <Route exact path="/css" component={ReactJSPage} />
        <Route exact path="/javascript" component={ReactJSPage} />
        <Route exact path="/react" component={ReactJSPage} />
        <Route exact path="/react-native" component={ReactJSPage} />
        <Route path="/react/:bookId" component={ReactJSBookPage} />
      </Switch>
    </div>
  );
}

export default App;
