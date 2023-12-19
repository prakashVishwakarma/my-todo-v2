const encrypt = (data: string, shift: number) => {
    return data.split('').map(char => {
        const charCode = char.charCodeAt(0);
        return String.fromCharCode(charCode + shift);
    })
        .join('');
}

export default encrypt;