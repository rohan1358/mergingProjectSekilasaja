import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Custom components and pages
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import FourOFourPage from "./pages/404page";
import PricingPage from "./pages/Pricing";
import BookDetailsPage from "./pages/BookDetailsPage";
import NewWebLanding from "./pages/NewWebLanding";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Switch>
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/pricing" component={PricingPage} />
          <Route exact path="/book-details" component={BookDetailsPage} />
          <Route exact path="/" component={Home} />
          <Route component={FourOFourPage} />
          {/* <Route component={NewWebLanding} /> */}
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
