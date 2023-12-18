// Define a function to get data from local storage
const getLocalStorageData = (key: string): Boolean | any => { // should not any
    try {
        // Get the item from local storage
        const storedData = localStorage.getItem(key);

        // Parse the JSON data if it exists
        if (storedData) {
            return JSON.parse(storedData);
        }

        return false;
    } catch (error) {
        console.error(`Error getting data from local storage: ${error}`);
        return false;
    }
};

export default getLocalStorageData;