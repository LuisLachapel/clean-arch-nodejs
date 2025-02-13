import {Prop, getModelForClass} from "@typegoose/typegoose"

class Login {

    @Prop({required: true, trim:true, unique: true, type: () => String})
    private username : string;

    @Prop({required: true, trim: true, type: () => String})
    private password : string;

    @Prop({required: true, type: () => String})
    private role : string;

    @Prop({required: true, type: () => Boolean, default: true})
    private status : boolean;

    constructor(username: string, password: string, role : string, status: boolean){
        this.username = username
        this.password = password
        this.role = role
        this.status = status
    }

    get _username(): string{
        return this.username
    }

    get _password(): string{
        return this.password
    }

    get _role() : string{
        return this.role
    }

    get _status(): boolean{
        return this.status
    }

    set _password(password: string){
        this.password = password
    }
}

const LoginModel = getModelForClass(Login)

export default LoginModel