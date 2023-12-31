import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { FiltroService } from 'src/app/core/services/filtro.service';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent {
  @Input() itemCount: number = 0;
  @Output() filterToggle = new EventEmitter<void>();
  @Output() openModal = new EventEmitter<void>();
  @Output() sortingChanged = new EventEmitter<string>();

  filterOpened: boolean = true;

  constructor(private ngbCollapse: NgbCollapse, private modalService: FiltroService) {
    this.updateFilterOpened(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateFilterOpened(event.target.innerWidth);
  }

  updateFilterOpened(windowWidth: number) {
    this.filterOpened = windowWidth >= 600;
  }

  toggleFilter() {
    if (window.innerWidth >= 600) {
      this.filterOpened = !this.filterOpened;
      this.ngbCollapse.toggle();
      this.filterToggle.emit();
    } else {
      this.modalService.openModal();
      console.log("Abriu");
    }
  }

  changeSorting(option: string) {
    this.sortingChanged.emit(option);
  }
}
