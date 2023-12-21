export default function deleteObjectById(array: any[], targetId: string) {
    return array.filter((obj: { id: string; }) => obj.id !== targetId);
}