// Define a function to get data from session storage
const storeDataInSessionStorage = (key: string, data: any): Boolean => { // should not any
    try {
        // Attempt to store data in session storage
        sessionStorage.setItem(key, JSON.stringify(data));
        return true; // Return true if successful
    } catch (error) {
        console.error('Error storing data in session storage:', error);
        return false; // Return false if an error occurs
    }
};

export default storeDataInSessionStorage;