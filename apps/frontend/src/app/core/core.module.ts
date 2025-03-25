import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api-service/api.service';
import { PersonService } from './services/person/person.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    HttpClientModule,
    ApiService,
    PersonService,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule já foi carregado. Importe apenas no AppModule.');
    }
  }
}
