
// Function to assign an object to a specific index in an array
export default function assignObjectAtIndex<T>(array: T[], index: number, object: T): T[] {
    if (index >= 0 && index <= array.length) {
        array[index] = object;
        return array;
    } else {
        console.error("Index out of bounds.");
        return array; // Return the original array in case of an error
    }
}