import React from "react";

// Custom components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Home from "./pages/Home/Home";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Switch>
          <Route path="/contact" component={Contact} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
