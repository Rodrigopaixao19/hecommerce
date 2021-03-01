import { db, firebase } from "./config";

import { UserInfo } from "../types";

export const usersRef = db.collection("users");

export const snapshotToUserInfo = (
  doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
) => {
  const docData = doc.data() as Omit<UserInfo, "id">;
  const userInfo: UserInfo = {
    id: doc.id,
    ...docData,
  };

  return userInfo;
};
