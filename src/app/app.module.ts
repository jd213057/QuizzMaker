import {HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {firstValueFrom} from 'rxjs';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {QuizzComponent} from './features/quizz/quizz.component';
import {QuizzQuestionComponent} from './shared/components/quizz-question/quizz-question.component';
import {QuizzSelectComponent} from './shared/components/quizz-select/quizz-select.component';
import {ChoiceDirective} from './shared/directives/choice';
import {UnescapePipe} from './shared/pipes/unescape';
import {QuizzService} from './shared/services/quizz.service';
import {QuizzResultsComponent} from './features/quizz-results/quizz-results.component';
import {RouterModule} from '@angular/router';
import { QuizzResultComponent } from './shared/components/quizz-result/quizz-result.component';

@NgModule({
    declarations: [
        AppComponent,
        QuizzSelectComponent,
        UnescapePipe,
        QuizzQuestionComponent,
        ChoiceDirective,
        QuizzComponent,
        QuizzResultsComponent,
        QuizzResultComponent,
    ],
    imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, AppRoutingModule, RouterModule],
    providers: [
        {
            provide: APP_INITIALIZER,
            multi: true,
            deps: [QuizzService],
            useFactory: (quizzService: QuizzService) => {
                return () => firstValueFrom(quizzService.initService());
            },
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
