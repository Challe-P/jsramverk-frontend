export async function runCode(code) {
    let data = {
        code: btoa(code)
    }
    let res = await fetch("https://execjs.emilfolino.se/code", {
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST'
    });
    let result = await res.json();
    return atob(result.data);
}
