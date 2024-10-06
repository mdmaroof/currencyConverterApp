export const handleApiErrors = (status, message = '') => {
    let errorMessage;

    switch (status) {
        case 400:
            errorMessage = 'Bad Request: The request was invalid or cannot be processed.';
            break;
        case 401:
            errorMessage = 'Unauthorized: Access is denied due to invalid credentials.';
            break;
        case 403:
            errorMessage = 'Forbidden: You do not have permission to access this resource.';
            break;
        case 404:
            errorMessage = 'Not Found: The requested resource could not be found.';
            break;
        case 405:
            errorMessage = 'Method Not Allowed: The request method is not allowed for the resource.';
            break;
        case 409:
            errorMessage = 'Conflict: There is a conflict with the current state of the resource.';
            break;
        case 422:
            errorMessage = 'Unprocessable Entity: The request could not be processed (e.g., validation error).';
            break;
        case 429:
            errorMessage = 'Too Many Requests: You have sent too many requests in a short time.';
            break;
        case 500:
            errorMessage = 'Internal Server Error: An error occurred on the server side.';
            break;
        case 501:
            errorMessage = 'Not Implemented: The server does not support this request method.';
            break;
        case 502:
            errorMessage = 'Bad Gateway: The server received an invalid response from an upstream server.';
            break;
        case 503:
            errorMessage = 'Service Unavailable: The server is currently unavailable (overloaded or down).';
            break;
        case 504:
            errorMessage = 'Gateway Timeout: The server took too long to respond.';
            break;
        default:
            errorMessage = message || 'An unknown error occurred.';
    }

    return errorMessage;
};
