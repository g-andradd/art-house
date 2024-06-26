import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  @Input() nomeProduto: string = '';
  @Input() descProduto: string = '';
  @Input() idProduto: string = '';
  numeroDeRolos: string = '';
  

  
  formulario: FormGroup = new FormGroup({
    largura: new FormControl('', [Validators.required]),
    altura: new FormControl('', [Validators.required])
  });

  constructor(private modalService: ModalService, private roloService: RoloService) { }


  ngAfterViewInit() {
    this.modalService.openModalWithImage$.subscribe(({idProduto}) => {
      if (idProduto === this.idProduto) {
        this.openModal();
        this.updateModalSize();
        this.updateRowGap();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['nomeProduto']) {
      this.nomeProduto = this.removeFileExtension(this.nomeProduto);
    }
    if (changes['numeroDeRolos']) {
      this.updateRowGap();
    }
  }

  private removeFileExtension(fileName: string): string {
    return fileName.split('.').slice(0, -1).join('.');
  }

  openModal() {
    $('#papelIndividual .modal-body img').attr('src', '');
    $('#papelIndividual .modal-body img').attr('src', this.imagePath);
    $('#papelIndividual').modal('show');
  }

  closeModal() {
    $('#papelIndividual').modal('hide');
    this.numeroDeRolos = '';
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

  getImage(image: Uint8Array):string{
    const pathImage = "data:image/png;base64,";
    return pathImage + image;
  }

  preventModalClick(event: Event) {
    event.stopPropagation();
  }
  

  clearForm() {
    this.formulario.reset();
    this.numeroDeRolos = '';

  }
  
  
}
