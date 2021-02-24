import { SignUpData } from "../types/index";
import { auth } from "../firebase/config";

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

      if (response) {
        auth.currentUser?.updateProfile({
          displayName: username,
        });

        setLoading(false);
        console.log("User -->", response);
      }
    } catch (err) {
      const { message } = err as { message: string };

      setError(message);
      setLoading(false);
    }
  };

  return { signup, loading, error };
};
