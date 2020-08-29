// FAQ category has many FAQs and a title
export class FAQCategory {
  questions: FAQ[];

  title: string;

  constructor(questions: FAQ[], title: string) {
    this.questions = questions;
    this.title = title;
  }
}

// FAQ is a question and an answer
export class FAQ {
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
