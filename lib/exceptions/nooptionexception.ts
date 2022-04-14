export default class NoOptionException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NoOptionException';
    }
}