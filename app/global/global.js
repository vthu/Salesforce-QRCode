let s_Inst = null;
class Global {
    constructor() {
        if (!s_Inst) {
            s_Inst = this;
            this.scanFlag = true;
            this.instance_url = '';
            this.token_type = '';
            this.access_token = '';
            this.username = '';
            this.password = '';
        }
        return s_Inst;
    }
}

export default global = new Global();