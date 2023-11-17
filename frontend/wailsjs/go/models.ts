export namespace define {
	
	export class Connection {
	    identity: string;
	    name: string;
	    addr: string;
	    port: string;
	    userName: string;
	    password: string;
	    type: string;
	
	    static createFrom(source: any = {}) {
	        return new Connection(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.identity = source["identity"];
	        this.name = source["name"];
	        this.addr = source["addr"];
	        this.port = source["port"];
	        this.userName = source["userName"];
	        this.password = source["password"];
	        this.type = source["type"];
	    }
	}
	export class M {
	    code: number;
	    msg: string;
	    data: any;
	
	    static createFrom(source: any = {}) {
	        return new M(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.code = source["code"];
	        this.msg = source["msg"];
	        this.data = source["data"];
	    }
	}

}

