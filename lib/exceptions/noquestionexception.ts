export default class NoQuestionException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NoQuestionException';
  }
}