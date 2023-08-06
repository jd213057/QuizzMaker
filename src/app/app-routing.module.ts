import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizzComponent} from './features/quizz/quizz.component';

const routes: Routes = [
    {path: '', redirectTo: '/quizz', pathMatch: 'full'},
    {path: 'quizz', component: QuizzComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
