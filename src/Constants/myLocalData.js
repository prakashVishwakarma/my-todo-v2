import generateRandomNumber from "@/Utils/generateRandomNumber"

export const myLocalData = [
    {
        "id": generateRandomNumber(),
        "email": "",
        "password": "",
        "confirmPassword": "",
        "myGoogleKeepTodo": [
            {
                "title": "",
                "contents": [
                    "",
                ]
            }
        ],
        "myRichTextEditorTodo": [
            {
                "title": "",
                "contents": [
                    "",
                ]
            }
        ]
    }
]

export const myLocalDataName = 'myLocalData'