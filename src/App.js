import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Custom pages
import LoginPage from "./pages/Login/Login";
import SignUpPage from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import FourOFourPage from "./pages/404page";
import PricingPage from "./pages/Pricing";
import BookDetailsPage from "./pages/BookDetails/BookDetailsPage";
import VideoWatchingPage from "./pages/VideoWatching";
import TextReadingPage from "./pages/TextReading/TextReading";
import AccountsPage from "./pages/Accounts/Accounts";
import Payment from "./pages/Payment/Payment";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import Library from "./pages/Library/Library";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import SearchResults from "./pages/SearchResults/SearchResults";

// import VerifyEmail from "./pages/VerifyEmail";
import HomeTwo from "./pages/Home/HomeTwo";
import FAQPage from "./pages/FAQ/FAQ";

// Unused
import Contact from "./pages/Contact";
import NewWebLanding from "./pages/NewWebLanding";

// Routing componentns
import PrivateRoute from "./components/Routing/PrivateRoute";
import { AuthProvider } from "./components/Routing/Auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {/* Private Routes (Only logged in users can see) */}
          <PrivateRoute exact path="/accounts" component={AccountsPage} />
          <PrivateRoute
            exact
            path="/text-page/:book_title"
            component={TextReadingPage}
          />
          <PrivateRoute
            exact
            path="/video/:book_title"
            component={VideoWatchingPage}
          />
          <PrivateRoute exact path="/library" component={Library} />
          <PrivateRoute exact path="/payment" component={Payment} />

          {/* Public Routes (Everybody can see) */}
          <Route exact path="/faq" component={FAQPage} />
          {/* <Route exact path="/verify-email" component={VerifyEmail} /> */}
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/lupa-password" component={ForgotPassword} />
          <Route exact path="/payment-success" component={PaymentSuccess} />
          <Route
            exact
            path="/searchResults/:searchValue"
            component={SearchResults}
          />
          <Route exact path="/pricing" component={PricingPage} />
          <Route
            exact
            path="/book-details/:book_title"
            component={BookDetailsPage}
          />
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={HomeTwo} />
          <Route component={FourOFourPage} />

          {/* <Route exact path="/" component={Contact} />
          <Route exact path="/" component={NewWebLanding} /> */}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
