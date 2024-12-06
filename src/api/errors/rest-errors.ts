export default class RestError extends Error {
    constructor(public message:string, public statusCode:number = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}
