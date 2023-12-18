import { myLocalDataName } from "@/Constants/myLocalData";
import getLocalStorageData from "./getLocalStorageData";

function areCredentialsMatching(email: string, password: string): Boolean {

    let matchingUser: Boolean = false;

    const isLocalStorageData = getLocalStorageData(myLocalDataName)

    if (isLocalStorageData) {

        matchingUser = isLocalStorageData.find((user: { email: string; password: string; }) => user.email === email && user.password === password);
        return !!matchingUser;

    } else {
        return matchingUser = false
    }

}

export default areCredentialsMatching;
