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
import {QuizResultComponent} from './shared/components/quiz-result/quiz-result.component';
import {ChoiceDirective} from './shared/directives/choice';
import {UnescapePipe} from './shared/pipes/unescape';
import {QuizService} from './shared/services/quiz.service';

@NgModule({
    declarations: [
        AppComponent,
        UnescapePipe,
        QuizQuestionComponent,
        ChoiceDirective,
        QuizComponent,
        QuizResultsComponent,
        QuizResultComponent,
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
