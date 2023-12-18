import { myLocalData } from '@/Constants/myLocalData';
import { MyLocalDataInterface, UpdateUserDataFunction } from '@/TypeScriptTypes/TypeScriptTypes';
import { useState } from 'react';

const useModifyLocalStorage = (): [MyLocalDataInterface, UpdateUserDataFunction] => {
    const [userData, setUserData] = useState<MyLocalDataInterface>(myLocalData[0]);

    const updateUserData = (updatedData: Partial<MyLocalDataInterface>) => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            ...updatedData,
        }));
    };

    return [userData, updateUserData];
};

export default useModifyLocalStorage;

// Example usage in a component
// Import the hook

// Update a specific property
// updateUserData({ confirmPassword: 'newPassword' });
