import Query from "./Query";

export default class QueryParent {
  namespace : string;
  socket : SocketIO.Socket;
  queries : Query[] = [];
  queryParents : QueryParent[] = [];

  constructor( namespace : string, socket : SocketIO.Socket ) {
    this.namespace = namespace;
    this.socket = socket;
  }

  on(header : string, callback : (...args : any[]) => void) : void {
    this.queries.push(new Query(header, callback));
  }

  appendQueryParent(q : QueryParent) {
    this.queryParents.push(q);
  }

  trigger( additionalNamespace : string = "" ) : void {
    if (additionalNamespace != "") additionalNamespace = additionalNamespace + ":";
    for (let q of this.queries) {
      this.socket.on( additionalNamespace + this.namespace + ":" + q.header, q.callback );
    }
    for (let queryParent of this.queryParents) {
      queryParent.trigger( this.namespace );
    }
  }
}
