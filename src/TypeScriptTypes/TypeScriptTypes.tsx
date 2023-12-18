export interface MyLocalDataInterface {
    id: string;
    user: string;
    email: string;
    password: string;
    confirmPassword: string;
    myGoogleKeepTodo: { title: string; contents: string[] }[];
    myRichTextEditorTodo: { title: string; contents: string[] }[];
}

export type UpdateUserDataFunction = (updatedData: Partial<MyLocalDataInterface>) => void;

// Define your UserData interface or type
export interface UserData {
  username: string;
  email: string;
}