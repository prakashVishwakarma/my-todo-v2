import { myLocalData, myLocalDataName } from '@/Constants/myLocalData';
import { useState } from 'react';

const useLocalStorage = (key?: string, initialValue?: any) => { // should not any

    // Get data from local storage or use initial value
    const storedValue = localStorage.getItem(key ?? myLocalDataName);
    const initial = storedValue ? JSON.parse(storedValue) : initialValue ? initialValue : myLocalData;

    // State to keep track of the current value
    const [value, setValue] = useState(initial);

    // Update local storage whenever the value changes
    const setStoredValue = (newValue: any) => {
        setValue(newValue);
        localStorage.setItem(key ?? myLocalDataName, JSON.stringify(newValue));
    };

    return [value, setStoredValue];
};

export default useLocalStorage;
