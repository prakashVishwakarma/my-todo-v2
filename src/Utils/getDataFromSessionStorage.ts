export default function getDataFromSessionStorage(key: string) {
    try {
        // Attempt to retrieve data from session storage
        const storedData = sessionStorage.getItem(key);

        if (storedData !== null) {
            const parsedData = JSON.parse(storedData);
            return { success: true, data: parsedData };
        } else {
            return { success: false, data: null };
        }
    } catch (error) {
        console.error('Error retrieving data from session storage:', error);
        return { success: false, data: null };
    }
}