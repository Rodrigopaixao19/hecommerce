import { SignUpData } from "../types/index";
import { auth, functions } from "../firebase/config";

import { useAsyncCall } from "./useAsyncCall";

export const useAuthentiate = () => {
  const { loading, setLoading, error, setError } = useAsyncCall();

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

  return { signup, loading, error };
};
