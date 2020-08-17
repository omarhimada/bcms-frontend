// FAQ category has many FAQs and a title
export class FrequentlyAskedQuestionCategory {
	questions: FrequentlyAskedQuestion[];
	title: string;
	constructor(questions: FrequentlyAskedQuestion[], title: string) {
		this.questions = questions;
		this.title = title;
	}
}

// FAQ is a question and an answer
export class FrequentlyAskedQuestion {
	question: string;
	answer: Answer;
	constructor(question: string, answer: Answer) {
		this.question = question;
		this.answer = answer;
	}
}

// Answer is HTML (WYSIWYG)
export class Answer {
	html: string;
	constructor(html: string) {
		this.html = html;
	}
}