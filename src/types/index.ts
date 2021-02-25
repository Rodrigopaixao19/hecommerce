import { firebase } from "../firebase/config";

export type AuthUser = firebase.User;

export type SignUpData = {
  username: string;
  email: string;
  password: string;
};
