export class User {
     uname: string;
     email: string;
     date: string;
     contact: string;
     school: string;
     education: string;
     percent: number;
     hobby?: boolean[];
     gender: string;
     address?: string;
     summary?: string;
   
    
    constructor(name: string, email: string, dob: string, phn: string,  scl: string,
        edu: string,
        per: number,
        hob: boolean[],
        gen: string,
        add: string,
        summ: string,
       ) {
        this.uname = name;
        this.email = email;
        this.date = dob;
        this.contact = phn;
        this.school = scl;
        this.education = edu;
        this.percent = per;
        this.hobby = hob;
        this.summary = summ;
        this.gender = gen;
        this.address = add;   
    }
}