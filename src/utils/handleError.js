/**
 * Created by Eric on 5/30/17.
 */
export function handleError(response) {
    let final = "";
    for(let i of response) {
        final += i.Message + "\n";
    }
    return final;
}