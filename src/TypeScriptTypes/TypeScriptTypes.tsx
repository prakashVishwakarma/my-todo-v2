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

export interface TodoItem {
  id: string;
  title: string;
  contents: {
    id: string;
    content: string;
  }[];
}

export interface Todo {
  id: number;
  title: string;
  contents: Content[];
}

export interface Content {
  id: number;
  content: string;
}

export interface MyLocalDataINTERFACE {
  id: number;
  email: string;
  password: string;
  confirmPassword: string;
  myGoogleKeepTodo: Todo[];
  myRichTextEditorTodo: Todo[];
}