import React from "react";
import Button from "../Button/Button";

import { Provider } from "../../types/index";
import { useAuthentiate } from "../../hooks/index";
import { useModalContext } from "../../state/modalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { firebase } from "../../firebase/config";

interface ISocialMediaLogin {
  socialLogin: (
    provider: Provider
  ) => Promise<firebase.functions.HttpsCallableResult | undefined>;
  loading: boolean;
}

const SocialMediaForm: React.FC<ISocialMediaLogin> = ({
  socialLogin,
  loading,
}) => {
  const { setModalType } = useModalContext();

  const handleSocialLogin = async (provider: Provider) => {
    const response = await socialLogin(provider);

    if (response) setModalType("close");
  };

  return (
    <div className="social">
      <Button
        className="social-btn social-btn--fb"
        width="100%"
        height="3rem"
        onClick={() => handleSocialLogin("facebook")}
        disabled={loading}
      >
        <FontAwesomeIcon icon={["fab", "facebook"]} size="1x" />
        <span>Sign up with Facebook</span>
      </Button>
      <Button
        className="social-btn social-btn--google"
        width="100%"
        height="3rem"
        onClick={() => handleSocialLogin("google")}
        disabled={loading}
      >
        <FontAwesomeIcon icon={["fab", "google"]} size="1x" />
        <span>Sign up with Google</span>
      </Button>
    </div>
  );
};

export default SocialMediaForm;
