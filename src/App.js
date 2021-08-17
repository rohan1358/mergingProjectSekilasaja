import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import firebase configuration
import fire from "./fire.js";

// Custom pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Contact from "./pages/Contact";
import Home from "./pages/Home/Home";
import FourOFourPage from "./pages/404page";
import Pricing from "./pages/Pricing";
import BookDetailsPage from "./pages/BookDetailsPage";
import VideoWatchingPage from "./pages/VideoWatching";
import TextReadingPage from "./pages/TextReading";
import Accounts from "./pages/Accounts/Accounts";
import NewWebLanding from "./pages/NewWebLanding";

// Routing componentns
import PrivateRoute from "./components/Routing/PrivateRoute";
import { AuthProvider } from "./components/Routing/Auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/pricing" component={Pricing} />
          {/* <Route exact path="/contact" component={Contact} />
          <Route exact path="/pricing" component={PricingPage} />
          <Route exact path="/book-details" component={BookDetailsPage} />
          <Route exact path="/video-page" component={VideoWatchingPage} />
          <Route exact path="/text-page" component={TextReadingPage} />
          <Route exact path="/video" component={VideoWatchingPage} />
          <Route exact path="/accounts" component={AccountsPage} />
          <Route exact path="/" component={Home} />
          <Route component={FourOFourPage} /> */}
          {/* <Route component={NewWebLanding} /> */}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
