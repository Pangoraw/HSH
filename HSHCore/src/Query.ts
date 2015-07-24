export default class Query {
  header : string;
  callback : (...args : any[]) => void;

  constructor( header : string, callback : (...args : any[]) => void) {
    this.header = header;
    this.callback = callback;
  }
}
