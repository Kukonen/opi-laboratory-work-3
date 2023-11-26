import { serverAdress } from '../settings.json';
import AuthService from './auth.service';
import { queryType } from './server.interfaces';

type methodType = 'GET' | 'POST' | 'PUT' | 'DELETE'

const urlFormatter = (URL: string, queries?: queryType[]): string => {
    let formatterURL: string = serverAdress;
    formatterURL += URL[0] === '/' ? URL.substring(1) : URL;

    if (queries) {
        const params = new URLSearchParams();

        for (let q of queries) {
            params.append(q.key, String(q.value));
        }

        formatterURL += '?' + params.toString();
    }

    return formatterURL;
}

const fetchResponseStatus = (response: Response, params: {
    URL: string,
    method: methodType,
    queryParams?: queryType[],
    body?: Object | string
}) => {
    if (!response.ok) {
        return errorResolve(response, params);
    }
    return Promise.resolve(response);
}

const fetchJson = (response: Response) => {
    // response.json().then( json => {
    //     return json;
    // }).catch( err => {
    //     throw new Error(err);   
    // })
    return Promise.resolve(response.json());
}

const fetchResponseResultStatus = (json: any) => {
    return new Promise((resolve, reject) => {
        const {status, _, ...objects} = json;

        return resolve(objects);
    })
}

const errorResolve = (error: Response, params: {
    URL: string,
    method: methodType,
    queryParams?: queryType[],
    body?: Object | string
}) : Promise<any> => {
    if (error.status === 401) {
        return nonAuthtorizedError(params);
    }

    return Promise.reject(error)
}

const nonAuthtorizedError = (params: {
    URL: string,
    method: methodType,
    queryParams?: queryType[],
    body?: Object | string
}) : Promise<any> => {
    if (localStorage.getItem("refresh")) {
        return AuthService.refresh().then(() => {
            return Promise.resolve(serverAfterError(params.URL, params.method, params.queryParams, params.body));
        }).catch( (err) => { 
            return Promise.reject(err)
        });
    }

    return Promise.reject("Unauthenticated and haven't refresh tocken");
}

const serverAfterError = async (
    URL: string,
    method: methodType = 'GET',
    queryParams?: queryType[],
    body?: Object | string
) => {
    // return new Promise((resolve, reject) => {
        let formatterURL:string = urlFormatter(URL, queryParams);

        let init:RequestInit = {};

        init.method = method;
        // init.credentials = 'include';

        init.headers = {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        };

        let bodyFormatter: string = '';

        if(body) {
            if (typeof body === 'string') {
                bodyFormatter = body;
            } else {
                bodyFormatter = JSON.stringify(body);
            }

            init.body = bodyFormatter;
        }

        return fetch(formatterURL, init)
            .then(response => {
                return Promise.resolve(response);
            })
            .catch((error: Response) => {
                return Promise.reject(error);
            });
    // });
}

const server = async (
    URL: string,
    method: methodType = 'GET',
    queryParams?: queryType[],
    body?: Object | string
) => {
    // return new Promise((resolve, reject) => {
        let formatterURL:string = urlFormatter(URL, queryParams);

        let init:RequestInit = {};

        init.method = method;
        // init.credentials = 'include';

        init.headers = {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        };

        let bodyFormatter: string = '';

        if(body) {
            if (typeof body === 'string') {
                bodyFormatter = body;
            } else {
                bodyFormatter = JSON.stringify(body);
            }

            init.body = bodyFormatter;
        }

        return fetch(formatterURL, init)
            .then(response => fetchResponseStatus(response, {
                URL,
                method,
                queryParams,
                body
            }))
            .then(fetchJson)
            .then(fetchResponseResultStatus)
            .catch((error: Response) => {
                return Promise.reject(error);
            });
    // });
}

export default server;