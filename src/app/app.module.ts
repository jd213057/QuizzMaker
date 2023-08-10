import {HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {firstValueFrom} from 'rxjs';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {QuizResultsComponent} from './features/quiz-results/quiz-results.component';
import {QuizComponent} from './features/quiz/quiz.component';
import {QuizQuestionComponent} from './shared/components/quiz-question/quiz-question.component';
import {ChoiceDirective} from './shared/directives/choice';
import {ResultDirective} from './shared/directives/result';
import {UnescapePipe} from './shared/pipes/unescape';
import {QuizService} from './shared/services/quiz.service';
import {QuizScoreBarComponent} from './shared/components/quiz-score-bar/quiz-score-bar.component';

@NgModule({
    declarations: [
        AppComponent,
        UnescapePipe,
        QuizQuestionComponent,
        ChoiceDirective,
        ResultDirective,
        QuizComponent,
        QuizResultsComponent,
        QuizScoreBarComponent,
    ],
    imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, AppRoutingModule, RouterModule],
    providers: [
        {
            provide: APP_INITIALIZER,
            multi: true,
            deps: [QuizService],
            useFactory: (quizService: QuizService) => {
                return () => firstValueFrom(quizService.initService());
            },
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
