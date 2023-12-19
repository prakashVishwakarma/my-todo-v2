import encrypt from "./encryptData";

const decrypt = (encryptedData: string, shift: number) => (encrypt(encryptedData, -shift))
export default decrypt;