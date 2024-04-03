export declare enum ResponseCode {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    WRONG_DATA = 406,
    CONFLICT = 409,
    ENTITIY_TOO_LONG = 413,
    UNSUPPORTED_MEDIA_TYPE = 415,
    INTERNAL_SERVER_ERROR = 500
}
export declare const ErrorMessage: {
    "204": string;
    "400": string;
    "401": string;
    "403": string;
    "404": string;
    "406": string;
    "409": string;
    "413": string;
    "415": string;
    "500": string;
};
