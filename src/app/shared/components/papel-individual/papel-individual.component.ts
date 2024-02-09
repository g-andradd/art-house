import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/core/services/modal.service';
import { RoloService } from 'src/app/core/services/rolo.service';

declare var $: any;

@Component({
  selector: 'app-papel-individual',
  templateUrl: './papel-individual.component.html',
  styleUrls: ['./papel-individual.component.css']
})
export class PapelIndividualComponent implements AfterViewInit, OnChanges {
  @Input() imagePath: string = '';
  @Input() nomeProduto:string = '';
  @Input() descProduto:string = '';
  numeroDeRolos: string = '';

  formulario: FormGroup = new FormGroup({
    largura: new FormControl('', [Validators.required]),
    altura: new FormControl('', [Validators.required])
  });

  constructor(private modalService: ModalService, private roloService: RoloService) { }

  ngAfterViewInit() {
    this.modalService.openModalWithImage$.subscribe(({imagePath}) => {
      if (imagePath === this.imagePath) {
        this.openModal();
        this.updateModalSize();
        this.updateRowGap();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['numeroDeRolos']) {
      this.updateRowGap();
    }
  }

  openModal() {
    $('#papelIndividual .modal-body img').attr('src', '');
    $('#papelIndividual .modal-body img').attr('src', this.imagePath);

    $('#papelIndividual .modal-body .nomeProduto h2').text('');
    $('#papelIndividual .modal-body .descProduto p').text('');
  
    $('#papelIndividual .modal-body .nomeProduto h2').text(this.nomeProduto);
    $('#papelIndividual .modal-body .descProduto p').text(this.descProduto);
    $('#papelIndividual').modal('show');



  }

  closeModal() {
    $('#papelIndividual').modal('hide');
  }

  submitForm() {
    if (this.formulario.valid) {
      const { largura, altura } = this.formulario.value;
      this.roloService.calcularQuantidadeDeRolos(largura, altura).subscribe(
        (response: string) => {
          this.numeroDeRolos = response;
          this.updateRowGap();
        },
        (error) => {
          console.error('Erro ao calcular a quantidade de rolos:', error);

          if (error.status === 200) {
            // Tratar o caso em que a resposta não é um JSON válido
            this.numeroDeRolos = error.error.text;
            this.updateRowGap();
          } else {
            // Tratar outros erros conforme necessário
          }
        }
      );
    }
  }

  private updateModalSize() {
    const isFullScreen = window.innerWidth <= 767;
    const modalBody = $('#papelIndividual .modal-body');

    if (isFullScreen) {
      modalBody.removeClass('mx-5 mb-5');
    } else {
      modalBody.addClass('mx-5 mb-5');
    }
    
  }

  private updateRowGap() {
    const isFullScreen = window.innerWidth <= 767;
    const rowDiv = $('#papelIndividual .modal-body .row');

    if (isFullScreen) {
      rowDiv.addClass('d-grid gap-4');
    } else {
      rowDiv.removeClass('d-grid gap-4');
    }
  }
}
