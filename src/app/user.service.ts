import { HttpClient} from '@angular/common/http';
import { User } from "./user.model";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class UserService{

 constructor(private http: HttpClient){}


 postUsers(user: User){
    return this.http.post<User>("http://localhost:3000/users", user)
 }

 getUsers(){
   return this.http.get<User[]>('http://localhost:3000/users')
 }

 deleteUser(id:string): Observable<void>{
   return this.http.delete<void>(`http://localhost:3000/users/${id}`)  
 }

 updateUser(id:string, user: User){
    return this.http.put<User>(`http://localhost:3000/users/${id}`, user)
 }

 getUser(id: string){
   return this.http.get<User>(`http://localhost:3000/users/${id}`)
 }

}
  


