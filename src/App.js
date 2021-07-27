import React from "react";

// Custom components and pages
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import FourOFourPage from "./pages/404page";
import PricingPage from "./pages/Pricing";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Switch>
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/pricing" component={PricingPage} />
          <Route exact path="/" component={Home} />
          <Route component={FourOFourPage} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
