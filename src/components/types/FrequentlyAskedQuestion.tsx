export class FrequentlyAskedQuestion {
	question: string;
	answer: Answer;
	constructor(question: string, answer: Answer) {
		this.question = question;
		this.answer = answer;
	}
}

export class Answer {
	html: string;
	constructor(html: string) {
		this.html = html;
	}
}