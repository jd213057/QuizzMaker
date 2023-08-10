import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizComponent} from './features/quiz/quiz.component';
import {QuizResultsComponent} from './features/quiz-results/quiz-results.component';

const routes: Routes = [
    {path: '', redirectTo: '/quiz', pathMatch: 'full'},
    {path: 'quiz', component: QuizComponent},
    {path: 'results', component: QuizResultsComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
