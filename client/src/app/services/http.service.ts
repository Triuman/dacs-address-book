
export const HttpService = {
    get,
    post,
    put,
    delete: _delete
}

const baseUrl: string = 'http://localhost:8888';

function getHeaders(token: string) {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
    };
}

function get<T>(path: string, token: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        fetch(baseUrl + path, {
            method: 'GET',
            headers: getHeaders(token)
        })
            .then((response: Response) => {
                response.json().then((resJson: T) => {
                    resolve(resJson);
                })
                    .catch(err => reject(err));
            })
            .catch(err => reject(err));
    });
}

function post<T1, T2>(path: string, token: string, body: T1): Promise<T2> {
    return new Promise<T2>((resolve, reject) => {
        fetch(baseUrl + path, {
            method: 'POST',
            headers: getHeaders(token),
            body: JSON.stringify(body)
        })
            .then((response: Response) => {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().then((resJson?: T2) => {
                        resolve(resJson);
                    });
                } else {
                    return response.text().then((resText?: string | T2) => {
                        resolve(resText as T2);
                    });
                }
            })
            .catch(err => reject(err));
    });
}

function put<T1, T2>(path: string, token: string, body: T1): Promise<T2> {
    return new Promise<T2>((resolve, reject) => {
        fetch(baseUrl + path, {
            method: 'PUT',
            headers: getHeaders(token),
            body: JSON.stringify(body)
        })
            .then((response: Response) => {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().then((resJson?: T2) => {
                        resolve(resJson);
                    });
                } else {
                    return response.text().then((resText?: string | T2) => {
                        resolve(resText as T2);
                    });
                }
            })
            .catch(err => reject(err));
    });
}

function _delete<T>(path: string, token: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        console.log(baseUrl + path);
        fetch(baseUrl + path, {
            method: 'DELETE',
            headers: getHeaders(token)
        })
            .then((response: Response) => {
                response.json().then((resJson: T) => {
                    resolve(resJson);
                })
                    .catch(err => reject(err));
            })
            .catch(err => reject(err));
    });
}
