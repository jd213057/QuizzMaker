import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizzComponent} from './features/quizz/quizz.component';
import {QuizzResultsComponent} from './features/quizz-results/quizz-results.component';

const routes: Routes = [
    {path: '', redirectTo: '/quizz', pathMatch: 'full'},
    {path: 'quizz', component: QuizzComponent},
    {path: 'results', component: QuizzResultsComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
