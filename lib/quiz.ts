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


class QuestionTimeoutException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "QuestionTimeoutException";
    }
}


export class Inswerable {
    private timeout: NodeJS.Timeout;
    private timedout:boolean;
    private stoped:boolean;
    private callBacks:(() => void)[] = []
    constructor(private question:Question,private quiz:Quiz){
        this.timedout = false;
        this.stoped = false;
        //this.callBacks = [];
        this.timeout = setTimeout(()=>this.ifTimedOut(), question.duration * 1000);
    }

    private ifTimedOut(){
            this.timedout = true;
            if(this.callBacks.length == 0){
                throw new QuestionTimeoutException(`Question ${this.question.id} timed out`);
            }else{                    
                    this.callBacks.forEach(cb =>{                   
                        cb()
                     })                
            }        
    }

    private getCallBacks(){
        
        return this.callBacks;
    }
    public whenTimedOut(callback:() => void):void {
        this.callBacks.push(callback);        
    }

    public isTimedOut():boolean {
        return this.timedout;
    }

    public stop():void {
        if(this.isSuspended()) return;
        clearTimeout(this.timeout);
    }
    public isSuspended():boolean {
        return this.stoped || this.timedout;
    }
    public getQuestion():Question {
        return this.question;
    }

    private compareAnsers(right:Answer,answer:Answer):boolean{
        return right.selected.filter(o => answer.selected.find(a => a.text === o.text)).length === right.selected.length;
    }

    public answer(answer:Answer):boolean {
        if(this.isSuspended()) throw new Error("You can't answer a question that is suspended( stopped/timedout)");
        this.stop();
        let question = this.quiz.questions.find(q => q.id === this.question.id);
        if(!question) throw new NoQuestionException('No question was found');        
        if(this.compareAnsers(question.rightAnswer,answer)){
            this.quiz.player.score++;
            this.quiz.answers.push({...answer,correct:true});
            return true;
        }
        this.quiz.answers.push({...answer,correct:false});
        this.quiz.player.score--;
        return false;
    }    

    
}

export class Quiz implements Test {
    id: number;
    name: string;
    questions: Question[];   
    answers?: Answer[]; 
    player: Player;
    currentQuestionIndex:number;
    constructor(options:TestOptions){
        if(options.questions.length === 0 ) throw new NoQuestionException('No Questions was provided');
        if(options.questions.find(q=> q.options.length < 2)) throw new NoOptionException('Not enough options');
        if(!options.player)  throw new NoPlayerException('No Player was provided');
        this.id = options.id;
        this.name = options.name;
        this.questions = options.questions;     
        this.player = options.player;
        this.player.score = 0;
        this.answers = []
        this.currentQuestionIndex = 0;
    }

    getScore():number{
        return this.player.score;
    }

    hasNext():boolean {
        return this.currentQuestionIndex < this.questions.length;
    }

    next():Inswerable {
        if(this.currentQuestionIndex >= this.questions.length){
            throw new NoQuestionException('No more questions');
        }
        return new Inswerable(this.questions[this.currentQuestionIndex++],this);
    }
   
    /* deprecated 
    addQuestion(question:Question){    
        if(question.options.length < 2) throw new NoOptionException('Not enough options');    
        this.questions.push(question);
    }

    
    answer(qid:number, answer:Answer):boolean{
        let question = this.questions.find(q => q.id === qid);
        if(!question) throw new NoQuestionException('No question was found');        
        if(this.compareAnsers(question.rightAnswer,answer)){
            this.player.score++;
            this.answers.push({...answer,correct:true});
            return true;
        }
        this.answers.push({...answer,correct:false});
        this.player.score--;
        return false;
    }
    */
}