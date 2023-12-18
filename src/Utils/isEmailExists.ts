import { myLocalData, myLocalDataName } from "@/Constants/myLocalData";
import getLocalStorageData from "./getLocalStorageData";

function isEmailExists(emailToCheck: string): boolean {

    const userData = getLocalStorageData(myLocalDataName);

    if (userData) {
        console.log('User data found in local storage.',userData)
        return userData.some((user: { email: string; }) => user.email === emailToCheck);
    } else {
         console.log("local storage is Empty");
        return false
    }
}

export default isEmailExists
