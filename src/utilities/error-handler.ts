
export class ErrorHandler extends Error {
    private statusCode: number;

    constructor(statusCode, message, stack: string = '') {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.stack = stack;
    }
}

export const handleError = (err, res) => {
    const { statusCode, message } = err;
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
};