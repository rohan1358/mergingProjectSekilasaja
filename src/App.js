import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import firebase configuration
import fire from "./firebase/fire";

// Custom pages
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import Contact from "./pages/Contact";
import Home from "./pages/Home/Home";
import FourOFourPage from "./pages/404page";
import PricingPage from "./pages/Pricing";
import BookDetailsPage from "./pages/BookDetails/BookDetailsPage";
import VideoWatchingPage from "./pages/VideoWatching";
import TextReadingPage from "./pages/TextReading/TextReading";
import AccountsPage from "./pages/Accounts/Accounts";
import Payment from "./pages/Payment.js";
import NewWebLanding from "./pages/NewWebLanding";

// Routing componentns
import PrivateRoute from "./components/Routing/PrivateRoute";
import { AuthProvider } from "./components/Routing/Auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {/* Private Route */}
          <PrivateRoute
            exact
            path="/text-page/:title"
            component={TextReadingPage}
          />
          <PrivateRoute exact path="/video" component={VideoWatchingPage} />
          <PrivateRoute exact path="/accounts" component={AccountsPage} />
          {/* Public Route */}
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/payment" component={Payment} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/pricing" component={PricingPage} />
          <Route
            exact
            path="/book-details/:title"
            component={BookDetailsPage}
          />
          <Route exact path="/" component={Home} />
          <Route component={FourOFourPage} /> */}
          {/* <Route component={NewWebLanding} /> */}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
