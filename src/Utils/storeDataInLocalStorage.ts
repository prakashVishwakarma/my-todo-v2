// Define a function to store data in local storage
const storeDataInLocalStorage = (key: string, data: any): boolean => {
    try {
        // Attempt to store data in local storage
        localStorage.setItem(key, JSON.stringify(data));
        return true; // Return true if successful
    } catch (error) {
        console.error('Error storing data in local storage:', error);
        return false; // Return false if an error occurs
    }
};

export default storeDataInLocalStorage;
