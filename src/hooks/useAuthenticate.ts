import { SignUpData, Provider } from "./../types/index";
import { useAuthContext, openUserDropdown } from "./../state/authContext";
import { auth, functions, firebase } from "../firebase/config";

import { useAsyncCall } from "./useAsyncCall";

export const useAuthentiate = () => {
  const {
    authState: { isUserDropdownOpen },
    authDispatch,
  } = useAuthContext();
  const {
    loading,
    setLoading,
    error,
    setError,
    successMsg,
    setSuccessMsg,
  } = useAsyncCall();

  const signup = async (data: SignUpData) => {
    const { username, email, password } = data;
    try {
      setLoading(true);

      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!response) {
        setError("Sorry, something went wrong!");
        setLoading(false);
        return;
      }

      // update the user displayname in firebase authentication
      await auth.currentUser?.updateProfile({
        displayName: username,
      });

      // call onsignup function to create a new user in firestore
      const onSignup = functions.httpsCallable("onSignup");

      const data = await onSignup({
        username,
      });

      setLoading(false);
      return data;
    } catch (err) {
      const { message } = err as { message: string };

      setError(message);
      setLoading(false);
    }
  };

  const signout = () => {
    auth
      .signOut()
      .then(() => {
        if (isUserDropdownOpen) authDispatch(openUserDropdown(false));
      })
      .catch((err) => alert(`Sorry, something went wrong ${err}`));
  };

  const signin = async (data: Omit<SignUpData, "username">) => {
    const { email, password } = data;
    try {
      setLoading(true);
      const response = await auth.signInWithEmailAndPassword(email, password);

      if (!response) {
        setError("Sorry, something went wrong");
        setLoading(false);
        return;
      }

      setLoading(false);
      return response;
    } catch (err) {
      const { message } = err as { message: string };
      setError(message);
      setLoading(false);
    }
  };

  const resetpassword = (data: Omit<SignUpData, "username" | "password">) => {
    setLoading(true);
    auth
      .sendPasswordResetEmail(data.email)
      .then(() => {
        setSuccessMsg("Please check your email to reset your password");
        setLoading(false);
      })
      .catch((err) => {
        const { message } = err as { message: string };
        setError(message);
        setLoading(false);
      });
  };

  const socialLogin = async (provider: Provider) => {
    try {
      setLoading(true);

      const providerObj =
        provider === "facebook"
          ? new firebase.auth.FacebookAuthProvider()
          : provider === "google"
          ? new firebase.auth.GoogleAuthProvider()
          : null;

      if (providerObj) return;

      //@ts-ignore
      const response = await auth.signInWithPopup(providerObj);

      if (!response) {
        setError("Sorry, something went wrong!");
        setLoading(false);
        return;
      }

      // call onsignup function to create a new user in firestore
      const onSignup = functions.httpsCallable("onSignup");

      const data = await onSignup({
        username: response.user?.displayName,
      });

      setLoading(false);
      return data;
    } catch (err) {
      const { message } = err as { message: string };

      setError(message);
      setLoading(false);
    }
  };

  return {
    signup,
    signout,
    signin,
    resetpassword,
    socialLogin,
    loading,
    error,
    successMsg,
  };
};
