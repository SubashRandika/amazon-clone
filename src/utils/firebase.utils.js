import { db } from "../firebase/firebase.config";

export const createUserProfileDocument = async (authUser, additionalUserInfo) => {
	if (!authUser) {
		return;
	}

	const userRef = db.doc(`users/${authUser.uid}`);
	const snapshot = await userRef.get();

	if (!snapshot.exists) {
		const { displayName, email } = authUser;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalUserInfo
			});
		} catch (error) {
			console.error(`error creating user: ${error.message}`);
		}
	}

	return userRef;
};
