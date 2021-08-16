import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import firebase configuration
import fire from "./fire.js";

// Custom pages
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";
import Contact from "./pages/Contact";
import Home from "./pages/Home/Home";
import FourOFourPage from "./pages/404page";
import Pricing from "./pages/Pricing";
import BookDetailsPage from "./pages/BookDetailsPage";
import VideoWatchingPage from "./pages/VideoWatching";
import TextReadingPage from "./pages/TextReading";
import Accounts from "./pages/Accounts/Accounts";
import NewWebLanding from "./pages/NewWebLanding";

// Custom components
import { AuthProvider } from "./components/Routing/Auth.js";

// Private & Public Routes
import PrivateRoute from "./components/Routing/PrivateRoute";
import PublicRoute from "./components/Routing/PublicRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/accounts" component={Accounts} />
          {/* <Route exact path="/" component={Home} /> */}
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/pricing" component={Pricing} />
        </div>
      </Router>
    </AuthProvider>

    // <div className="App">
    //   <Router>
    //     <Switch>
    //       <Route exact path="/book-details" component={BookDetailsPage} />
    //       <Route exact path="/text-page" component={TextReadingPage} />
    //       <Route exact path="/video" component={VideoWatchingPage} />

    //       {/* Public Routes */}
    //       <PublicRoute
    //         restricted={true}
    //         component={LoginPage}
    //         path="/login"
    //         exact
    //       />
    //       <PublicRoute
    //         restricted={true}
    //         component={SignUpPage}
    //         path="/signup"
    //         exact
    //       />
    //       <PublicRoute restricted={false} component={Home} path="/" exact />
    //       <PublicRoute
    //         restricted={false}
    //         component={Contact}
    //         path="/contact"
    //         exact
    //       />
    //       <PublicRoute
    //         restricted={false}
    //         component={PricingPage}
    //         path="/pricing"
    //         exact
    //       />

    //       {/* Private Routes */}
    //       <PrivateRoute component={AccountsPage} path="/accounts" exact />

    //       {/* Leads to 404 Page if there is no other pages */}
    //       <Route component={FourOFourPage} />

    //       <Route component={NewWebLanding} />
    //     </Switch>
    //   </Router>
    // </div>
  );
}

export default App;
