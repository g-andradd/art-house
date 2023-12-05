import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPapelDeParedeComponent } from './card-papel-de-parede/card-papel-de-parede.component';
import { LeadDescontoFormComponent } from './lead-desconto-form/lead-desconto-form.component';
import { ModalPromocaoComponent } from './modal-promocao/modal-promocao.component';
import { NotificacaoComponent } from './notificacao/notificacao.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PapelIndividualComponent } from './papel-individual/papel-individual.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';



@NgModule({
  declarations: [
    CardPapelDeParedeComponent,
    LeadDescontoFormComponent,
    ModalPromocaoComponent,
    NotificacaoComponent,
    PapelIndividualComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  exports: [
    CardPapelDeParedeComponent,
    LeadDescontoFormComponent,
    ModalPromocaoComponent,
    NotificacaoComponent,
    PapelIndividualComponent
  ],
  providers: [provideNgxMask()]
})
export class ComponentsModule {}
