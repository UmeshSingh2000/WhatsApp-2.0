const errorMessage = {
    AUTH: {
        USER_NOT_FOUND: "User not found",
        INVALID_CREDENTIALS: "Invalid credentials",
        USER_ALREADY_EXISTS: "User already exists",
        UNAUTHORIZED_ACCESS: "Unauthorized access",
    },
    VALIDATION: {
        MISSING_FIELDS: "Required fields are missing",
        INVALID_PHONE_NUMBER: "Invalid phone number format",
        BAD_REQUEST: "Bad request, please check your input",
    },
    SERVER: {
        SERVER_ERROR: "An error occurred on the server",
        INTERNAL_SERVER_ERROR: "Internal server error, please try again later",
        SERVICE_UNAVAILABLE: "Service is currently unavailable, please try again later",
        GATEWAY_TIMEOUT: "Gateway timeout, please try again later"
    },
    GENERAL: {
        FORBIDDEN: "Forbidden access",
        RESOURCE_NOT_FOUND: "Requested resource not found",
        CONFLICT: "Conflict with existing resource"
    }
}
module.exports = errorMessage;