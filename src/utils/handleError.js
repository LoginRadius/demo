export function formatErrorMessage(response) {
    let final = "";
    for(let i of response) {
        final += i.Message + "\n";
    }
    return final;
}