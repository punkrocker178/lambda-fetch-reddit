const fetch = require('node-fetch');
const url = require('url');
const redditBaseURL = 'https://oauth.reddit.com/';
exports.handler = async (event, context, callback) => {
    // TODO implement
    let data;
    let path = createPath(event);
    let options = {
        method: event.httpMethod,
        headers: buildRequestHeaders(event.headers)
    }

    let fetchPromise;

    if (event.httpMethod === 'POST') {
        let body = JSON.parse(event.body);
        options.body = body;
    }

    fetchPromise = fetch(path, options)
        .then((res) => {
            res = handleErrors(res);
            return res.json();
        })
        .then((json) => {
            data = json;
            const response = buildResponse(200, data);
            return response;
        })
        .catch((error) => {
            const errorResponse = buildResponse(error.statusCode, error);
            return errorResponse;
        });
    return fetchPromise;
};

function createPath(eventPath) {
    let diffRegex = /\/oauth\/(?!\/[\D]+)/;
    let path = eventPath.path.replace(diffRegex, '');
    let apiPath = new url.URL(url.resolve(redditBaseURL, path));

    if (eventPath.queryStringParameters) {
        Object.keys(eventPath.queryStringParameters).forEach((key) => {
            apiPath.searchParams.append(key, eventPath.queryStringParameters[key]);
        });
    }

    return apiPath.toString();
}

function buildResponse(statusCode, data) {
    let response = {};
    response.statusCode = statusCode;
    response.headers = {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
    }
    response.body = JSON.stringify(data);
    return response;
}

function buildRequestHeaders(headers) {

    let myHeaders = new fetch.Headers({
        'Authorization': headers.Authorization ? headers.Authorization : '',
        'User-Agent': 'desktop:r2_7JfrpPUeQyA:v0.0.1 (by /u/SteelBeast177)'
    });

    return myHeaders;
}

function handleErrors(response) {
    if (!response.ok) {
        throw {
            statusCode: response.status,
            message: response.statusText
        }
    }
    return response;
}