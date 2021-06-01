import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext.js";
import Profile from "./components/Profile.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import ResetPassword from "./components/ResetPassword.js";
import PrivateRoute from "./components/PrivateRoute.js";
import UpdateProfile from "./components/UpdateProfile.js";
import NotFound from "./components/NotFound.js";

function App() {
	return (
		<Container className={["d-flex", "align-items-center", "justify-content-center"]} style={{ minHeight: "100vh" }}>
			<div className="w-100" style={{ maxWidth: "400px" }}>
				<AuthProvider>
					<Router>
						<Switch>
							<PrivateRoute exact path="/" component={Profile} />
							<PrivateRoute path="/update-profile" component={UpdateProfile} />
							<Route path="/reset-password" component={ResetPassword} />
							<Route path="/signup" component={Signup} />
							<Route path="/login" component={Login} />
							<Route path="/not-found" component={NotFound} />
							<Redirect to="/not-found" />
						</Switch>
					</Router>
				</AuthProvider>
			</div>
		</Container>
	);
}

export default App;
