import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Custom components and pages
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import FourOFourPage from "./pages/404page";
import PricingPage from "./pages/Pricing";
import BookDetailsPage from "./pages/BookDetailsPage";
import VideoWatchingPage from "./pages/VideoWatching";
import NewWebLanding from "./pages/NewWebLanding";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/pricing" component={PricingPage} />
          <Route exact path="/book-details" component={BookDetailsPage} />
          <Route exact path="/video-page" component={VideoWatchingPage} />
          <Route exact path="/" component={Home} />
          <Route component={FourOFourPage} />
          {/* <Route component={NewWebLanding} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
