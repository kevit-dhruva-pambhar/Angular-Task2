import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPanelComponent } from "./login-panel/login-panel.component";
import { ShowUserDetailsComponent } from "./show-user-details/show-user-details.component";
import { UserDetailsComponent } from "./user-details/user-details.component";


const appRoutes: Routes =[
    {path:'' , component: LoginPanelComponent, children: [
        {path:'loginpanel',component: LoginPanelComponent}]
    },
    {path:'userdetails' , component: UserDetailsComponent},
    {path:'showdetails', component: ShowUserDetailsComponent},
    {path:'showdetails/:id', component: ShowUserDetailsComponent},
    {path:'userdetails/:id', component: UserDetailsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule] 
})


export class AppRoutingModule{
  
}

