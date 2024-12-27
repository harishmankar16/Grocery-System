/** Server constants to be defined here */
export class AppServerConstant {

    public static CORS = {
        ACCESS_CONTROL_ALLOW_ORIGIN:'Access-Control-Allow-Origin',
        ACCESS_CONTROL_ALLOW_METHODS:'Access-Control-Allow-Methods',
        ACCESS_CONTROL_ALLOW_HEADERS:'Access-Control-Allow-Headers',
        CONTENT_TYPE:'Content-Type', 
        APPLICATION_JSON:'application/json',
        ALL_METHODS: 'GET,HEAD,OPTIONS,POST,PUT',
        ALL_HEADERS: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        TEXT_HTML:'text/html',
        ALL:'*'
    }
    
    public static PORT = 'port';
    public static LISTENING_TEXT = 'listening';
    public static DB_RETRY_ATTEMPTS: 'Retry connection attempt: %s';
    public static APP_SERVER = '';

    public static ERROR_MESSAGES = {
        ERROR_TEXT: 'error',
        FAILED: 'FAILED',
        LOG_ERROR: 'Error :',
        ERROR: 'ERROR :',
        ERROR_CONNECTION_CODE: 'ECONNREFUSED',
        ERROR_CONNECTION_TEXT: 'The server refused the connection',
        ERROR_DB_CONNECTION: 'Unable to connect to the database',
        DB_MODELS_INIT_FAILED: 'Database models initialization failed',
        DB_MODELS_ASSOCIATION_FAILED: 'Database models association failed',
        ERROR_DB_CONNECTION_EXCEPTION: 'Error occurred while connecting to database server',
        ERROR_SERVER_RESOURCES_CONNECTION_FAILURE: 'Error while connecting to server resources',
        INVALID_MOBILE_NUMBER: 'Invalid mobile number!',
        INVALID_CREDENTIALS: 'Invalid mobile number OR password!',
        INVALID_PARAMETERS: 'Invalid parameters.',
        ALREADY: 'This batch is already created.',
        SOMETHING_WENT_WRONG: 'Something went wrong.',
    };
    public static SUCCESS_MESSAGES = {
        SUCCESS: 'SUCCESS',
        UPDATE: 'UPDATE',
        SUCCESS_CONNECTION_TEXT: 'Connection successful',
        RABBIT_CONNECTION: 'RabbitMQ connection established successfully',
        RABBIT_CHANNEL_CREATE: 'RabbitMQ channel created successfully',
        REDIS_CONNECTION_SUCCESSFUL : 'Redis connection established successfully',
        ALL_ARTICLE_SYNCED_SUCCESS: 'All articles synced in redis cache successfully.',
        READY_TEXT :'ready',
        UPDATED_SUCCESS :'Updated successfully.',
        CREATED_SUCCESS :'Batch is created successfully.',
        EXPENSE_SUCCESS :'Expense Added Successfully.',
        EXPENSE_UPDATE :'Expense Updated Successfully.',
        CHANGE_PASSWORD:'PLEASE CHANGE YOUR PASSWORD.',
        PASSWORD_CHANGED:'PASSWORD CHANGED'
    };
    public static RESPONSE_CODE = {
        OK: 200,
        CREATED: 201,
        BAD_REQUEST: 400, // generic client-side error
        UNAUTHORIZED: 401, // req for protected resource without proper authorization
        FORBIDDEN: 403, // req valid but not have necessary permissions
        NOT_FOUND: 404, // requested resource is invalid OR server don't wanna reveal why req is refused
        INTERNAL_SERVER_ERROR: 500, //generic REST API error response for any exception

    };
}
