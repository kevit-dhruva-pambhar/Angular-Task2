export class User {
     uname: string;
     email: string;
     date: string;
     contact: string;
     school: string;
     education: string;
     percent: number;
     gender: string;
     address?: string;
     summary?: string;
     selected?: string[];
     uid: string
   
    
    constructor(name: string, email: string, dob: string, phn: string,  scl: string,
        edu: string,
        per: number,
        gen: string,
        add: string,
        summ: string,
        selected: string[]
       ) {
        this.uname = name;
        this.email = email;
        this.date = dob;
        this.contact = phn;
        this.school = scl;
        this.education = edu;
        this.percent = per;
        this.summary = summ;
        this.gender = gen;
        this.address = add;  
        this.selected = selected 
    }
}