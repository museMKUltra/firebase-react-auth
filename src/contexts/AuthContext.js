import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase.js";

const AuthContext = React.createContext(undefined);

export function useAuth() {
	return useContext(AuthContext);
}

function AuthProvider({ children }) {
	const [isLoading, setIsLoading] = useState(true);

	function signup(email, password) {
		return auth.createUserWithEmailAndPassword(email, password);
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function loginAnonymously() {
		return auth.signInAnonymously();
	}

	function logout() {
		auth.signOut();
	}

	function resetPassword(email) {
		auth.sendPasswordResetEmail(email);
	}

	function updateEmail(email) {
		return currentUser.updateEmail(email);
	}

	function updatePassword(password) {
		return currentUser.updatePassword(password);
	}

	const [currentUser, setCurrentUser] = useState();
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user);
			setIsLoading(false);
		});
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signup,
		login,
		loginAnonymously,
		logout,
		resetPassword,
		updateEmail,
		updatePassword,
	};

	return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
}

export default AuthProvider;
