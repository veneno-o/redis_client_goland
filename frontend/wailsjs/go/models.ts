export namespace define {
	
	export class AddHash {
	    conn_identity: string;
	    key: string;
	    value: {[key: string]: string};
	    ttl: number;
	
	    static createFrom(source: any = {}) {
	        return new AddHash(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.conn_identity = source["conn_identity"];
	        this.key = source["key"];
	        this.value = source["value"];
	        this.ttl = source["ttl"];
	    }
	}
	export class AddUpdateString {
	    conn_identity: string;
	    key: string;
	    value: string;
	    ttl: number;
	
	    static createFrom(source: any = {}) {
	        return new AddUpdateString(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.conn_identity = source["conn_identity"];
	        this.key = source["key"];
	        this.value = source["value"];
	        this.ttl = source["ttl"];
	    }
	}
	export class Cli {
	    conn_identity: string;
	
	    static createFrom(source: any = {}) {
	        return new Cli(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.conn_identity = source["conn_identity"];
	    }
	}
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
	export class DelHash {
	    conn_identity: string;
	    key: string;
	
	    static createFrom(source: any = {}) {
	        return new DelHash(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.conn_identity = source["conn_identity"];
	        this.key = source["key"];
	    }
	}
	export class DelHashItem {
	    conn_identity: string;
	    key: string;
	    field: string[];
	
	    static createFrom(source: any = {}) {
	        return new DelHashItem(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.conn_identity = source["conn_identity"];
	        this.key = source["key"];
	        this.field = source["field"];
	    }
	}
	export class DelString {
	    conn_identity: string;
	    key: string;
	
	    static createFrom(source: any = {}) {
	        return new DelString(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.conn_identity = source["conn_identity"];
	        this.key = source["key"];
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
	export class SearchKey {
	    conn_identity: string;
	    db: number;
	    keyword: string;
	    keyType: string;
	
	    static createFrom(source: any = {}) {
	        return new SearchKey(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.conn_identity = source["conn_identity"];
	        this.db = source["db"];
	        this.keyword = source["keyword"];
	        this.keyType = source["keyType"];
	    }
	}
	export class UpdateHashItem {
	    conn_identity: string;
	    key: string;
	    field: {[key: string]: string};
	
	    static createFrom(source: any = {}) {
	        return new UpdateHashItem(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.conn_identity = source["conn_identity"];
	        this.key = source["key"];
	        this.field = source["field"];
	    }
	}

}

