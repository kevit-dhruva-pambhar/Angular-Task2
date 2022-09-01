
import { User } from "./user.model";
import { nanoid } from "nanoid";

export class UserService{

 private _user : User;
 private _details: User[] = [];
 private _userId : string;

public set user(user: User){
     user = this._user;
}

public set details(details: User[]){
    details = this._details;
}

 public get user(){
    return this._user;
 }

 public get details(){
    return this._details;
 }

 public get userId(){
    return this._userId = nanoid(6);
 }

}   


