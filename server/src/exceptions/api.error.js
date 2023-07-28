module.exports = class ApiError extends Error{
    constructor(status, message, errors = []){
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static UnautorizedError(){
        return new ApiError(401, 'Пользователь не аворизован')
    }
    static BadRequest(){
        return new ApiError(400, message, errors);
    }
}