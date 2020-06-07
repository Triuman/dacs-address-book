import { useSelector } from "react-redux";

import { selectToken } from "../store/session";

//This class abstracts react's fetch method and auth token process.
//Next step could be decoupling token acquiring(redux) and fetch(react)
class WebService {

    private getHeaders() {
        const token = useSelector(selectToken);
        return {
            'Content-Type': 'application/json',
            'Authorization': token || ''
        };
    }

    get<T>(url: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            fetch(url, {
                method: 'GET',
                headers: this.getHeaders()
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

    post<T1, T2>(url: string, body: T1): Promise<T2> {
        return new Promise<T2>((resolve, reject) => {
            const token = useSelector(selectToken);
            fetch(url, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(body)
            })
                .then((response: Response) => {
                    response.json().then((resJson: T2) => {
                        resolve(resJson);
                    })
                        .catch(err => reject(err));
                })
                .catch(err => reject(err));
        });
    }

    put<T1, T2>(url: string, body: T1): Promise<T2> {
        return new Promise<T2>((resolve, reject) => {
            const token = useSelector(selectToken);
            fetch(url, {
                method: 'PUT',
                headers: this.getHeaders(),
                body: JSON.stringify(body)
            })
                .then((response: Response) => {
                    response.json().then((resJson: T2) => {
                        resolve(resJson);
                    })
                        .catch(err => reject(err));
                })
                .catch(err => reject(err));
        });
    }

    delete<T>(url: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const token = useSelector(selectToken);
            fetch(url, {
                method: 'DELETE',
                headers: this.getHeaders()
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

}

const webService = new WebService();

export default webService;