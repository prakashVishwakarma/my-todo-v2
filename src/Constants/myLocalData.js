import generateRandomNumber from "@/Utils/generateRandomNumber"

export const myLocalData = [
    {
        "id": generateRandomNumber(),
        "email": "",
        "password": "",
        "confirmPassword": "",
        "myGoogleKeepTodo": [
            {
                "id": generateRandomNumber(),
                "title": "",
                "contents": [
                    {
                        "id": generateRandomNumber(),
                        "content": "",
                    },
                ]
            }
        ],
        "myRichTextEditorTodo": [''
            // {
            //     "id": generateRandomNumber(),
            //     "title": "",
            //     "contents": [
            //         {
            //             "id": generateRandomNumber(), 
            //             "content": "",
            //         },
            //     ]
            // }
        ]
    }
];

export const myLocalDataName = 'myLocalData';
export const encryptionDataStrengths = 3;
export const whoIsLoggedIn = 'whoIsLoggedIn';
export const myRichTextEditorData = 'myRichTextEditorData';