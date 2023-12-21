import generateRandomNumber from "./generateRandomNumber";

export default function ModifyTodoData(title: string, contents: any[]) {
    // Assuming you have an initial data structure
    let initialData = {
      id: generateRandomNumber(),
      title: "",
      contents: [{ id: generateRandomNumber(), content: "" }]
    };
  
    // Update the data with the provided values
    // initialData.id = id || initialData.id;
    initialData.title = title || initialData.title;
  
    if (contents && contents.length > 0) {
      initialData.contents = contents.map((item: { content: any; }) => ({
        id: generateRandomNumber(),
        content: item.content || ""
      }));
    }
  
    return initialData;
  }