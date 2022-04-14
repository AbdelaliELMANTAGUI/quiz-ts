import Player from "./player";
import Question from "./question";
import Answer from "./answer";
import NoQuestionException from "./exceptions/noquestionexception"; "./exceptions/noquestionexception";
import NoPlayerException from "./exceptions/noplayerexception";
import NoOptionException from "./exceptions/nooptionexception";
export interface Test {
    id: number;
    name: string;
    questions: Question[];
    answers?: Answer[];
    player: Player;
}

export interface TestOptions {
    id: number;
    name: string;
    questions: Question[];    
    player: Player;
}

export class Quiz implements Test {
    id: number;
    name: string;
    questions: Question[];   
    answers?: Answer[]; 
    player: Player;

    constructor(options:TestOptions){
        this.id = options.id;
        this.name = options.name;
        if(options.questions.length === 0 ) throw new NoQuestionException('No Questions was provided');
        if(options.questions.find(q=> q.options.length < 2)) throw new NoOptionException('Not enough options');
        this.questions = options.questions;     
        if(!options.player)  throw new NoPlayerException('No Player was provided');
        this.player = options.player;
        this.player.score = 0;
        this.answers = []
    }

    addQuestion(question:Question){    
        if(question.options.length < 2) throw new NoOptionException('Not enough options');    
        this.questions.push(question);
    }

    private compareAnsers(right:Answer,answer:Answer):boolean{
        return right.selected.filter(o => answer.selected.find(a => a.text === o.text)).length === right.selected.length;
    }

    answer(qid:number, answer:Answer):boolean{
        let question = this.questions.find(q => q.id === qid);
        if(!question) throw new NoQuestionException('No question was found');        
        if(this.compareAnsers(question.rightAnswer,answer)){
            this.player.score++;
            this.answers.push(answer);
            return true;
        }
        this.player.score--;
        return false;
    }

}