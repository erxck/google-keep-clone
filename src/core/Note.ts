export default class Note {
  private id: string;
  private title: string;
  private body: string;

  constructor(title: string, body: string, id: string = "") {
    this.title = title;
    this.body = body;
    this.id = id;
  }

  get Title() {
    return this.title;
  }

  get Body() {
    return this.body;
  }

  get Id() {
    return this.id;
  }
}
