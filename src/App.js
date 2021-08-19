import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import firebase configuration
import fire from "./fire";

// Custom pages
import Contact from "./pages/Contact";
import Home from "./pages/Home/Home";
import FourOFourPage from "./pages/404page";
import PricingPage from "./pages/Pricing";
import BookDetailsPage from "./pages/BookDetails/BookDetailsPage";
import VideoWatchingPage from "./pages/VideoWatching";
import TextReadingPage from "./pages/TextReading/TextReading";
import AccountsPage from "./pages/Accounts/Accounts";
import NewWebLanding from "./pages/NewWebLanding";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/pricing" component={PricingPage} />
          <Route
            exact
            path="/book-details/:title"
            component={BookDetailsPage}
          />
          <Route exact path="/video-page" component={VideoWatchingPage} />
          <Route exact path="/text-page/:title" component={TextReadingPage} />
          <Route exact path="/video" component={VideoWatchingPage} />
          <Route exact path="/accounts" component={AccountsPage} />
          <Route exact path="/" component={Home} />
          <Route component={FourOFourPage} />
          {/* <Route component={NewWebLanding} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
