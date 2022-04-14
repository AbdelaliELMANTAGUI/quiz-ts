export default class NoPlayerException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NoPlayerException';
    }
}