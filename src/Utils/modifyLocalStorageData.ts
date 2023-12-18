import { myLocalData } from "@/Constants/myLocalData";

const modifyLocalStorageData = (dataToUpdate: any) => {
    const updatedData = {
        ...myLocalData[0],
        ...dataToUpdate
    };
    return updatedData;
};

export default modifyLocalStorageData;
