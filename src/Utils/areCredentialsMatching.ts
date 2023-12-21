import { myLocalDataName } from "@/Constants/myLocalData";
import getLocalStorageData from "./getLocalStorageData";

function areCredentialsMatching(email: string, password: string, boolean: Boolean): Boolean | any { // should not any

    let matchingUser: Boolean | any = false;
    const isLocalStorageData = getLocalStorageData(myLocalDataName)

    if (isLocalStorageData) {

        matchingUser = isLocalStorageData.find((user: { email: string; password: string; }) => user.email === email && user.password === password);
        if (boolean) return !!matchingUser
        return matchingUser;

    }
    return matchingUser = false
}

export default areCredentialsMatching;
