import Answer from "./answer";
import Option from "./option";
export default interface Question {
    id: number;
    text: string;
    rightAnswer: Answer;
    options: Option[];
}