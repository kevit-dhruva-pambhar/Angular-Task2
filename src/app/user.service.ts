import { HttpClient} from '@angular/common/http';
import { User } from "./user.model";
import { nanoid } from "nanoid";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class UserService{

 constructor(private http: HttpClient){}

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

 postUsers(user: User){
    this.http.post<User>("http://localhost:3000/users", user)
             .subscribe((res) => {
               return res
              });
 }

 getUsers(){
   return this.http.get<User[]>('http://localhost:3000/users')
 }

 deleteUser(id:number): Observable<void>{
   return this.http.delete<void>(`http://localhost:3000/users/${id}`)  
 }

 updateUser(id:number, user: User){
    this.http.put<User>(`http://localhost:3000/users/${id}`, user)
             .subscribe((res) => {
               return res
             });
 }

 getUser(id: number){
   return this.http.get<User>(`http://localhost:3000/users/${id}`)
 }

}
  


