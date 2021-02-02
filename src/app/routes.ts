import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { CellarsListComponent } from './cellars-list/cellars-list.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    // Home is '' bc if a user leaves their browser session idle for a long period of time and then refresh the page the url will 
    // be localhost:4200/ not localhost:4200/home so we use '' for the home route and our auth guard would just do 
    // localhost:4200/ + '' + '' = localhost:4200/
    { path: '', component: HomeComponent},
    {
        path: '', // localhost:4200/ + whatever the child route is
        runGuardsAndResolvers: 'always', // specifying always means run the authguard on every route execution
        canActivate: [AuthGuard],
        children: [
            { path: 'cellars', component: CellarsListComponent, canActivate: [AuthGuard]},
            { path: 'messages', component: MessagesComponent},
            { path: 'lists', component: ListsComponent}
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
