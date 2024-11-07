import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import { MatPaginator as MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource as MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { DatePipe } from '@angular/common';
import {MatSort, Sort} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PedidoListComponent implements OnInit {

  ELEMENT_DATA: Pedido[] = []
   // Supondo que a data de hoje seja obtida assim
 hoje: string = new Date().toString();
 dataInicio = this.hoje;
 dataFinal  = this.hoje;
 

  pedido: Pedido = {
    id: '',
    data_registro: '',
    valor_total: '',
    cliente_fk: null,
    status: '',
    nomeCliente: ''
  }
  dataSource = new MatTableDataSource<Pedido>(this.ELEMENT_DATA);
  displayedColumns: string[] = ['id', 'cliente', 'data_registro', 'valor_total', 'status', 'acoes'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: Pedido | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private service: PedidoService,
              private toast: ToastrService,
              private dialog: MatDialog,
              private router: Router,
              private datePipe: DatePipe,
              private _liveAnnouncer: LiveAnnouncer
             ) { }

 announceSortChange(sortState: Sort) {
  if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction === 'asc' ? 'ascending' : 'descending'}`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }
}

  ngOnInit(): void {
    this.findAll(this.dataInicio,this.dataFinal);
  }

  findById(): void{
    this.service.findById(this.pedido.id).subscribe(resposta =>{
      this.pedido = resposta
    })
  }

  redirectToPagamentos(elementId: number) {
  this.router.navigate(['/pagamentos', elementId]);
}

  findAll(dataInicio: string, dataFinal: string){
     dataInicio = this.datePipe.transform(dataInicio, 'dd/MM/yyyy');
     dataFinal = this.datePipe.transform(dataFinal, 'dd/MM/yyyy');
     this.service.findAll(dataInicio,dataFinal).subscribe(resposta => {
    
   const formatarResposta = resposta.map((pedido: Pedido) =>{
      return{
      ...pedido,
      valor_total: pedido.valor_total
      };
    });
    
    this.ELEMENT_DATA = formatarResposta 
    this.dataSource.data = this.ELEMENT_DATA;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 // Método para verificar se o botão deve ser desabilitado
  isButtonDisabled(dataRegistro: string): boolean {
    // Comparação para desabilitar o botão se a data de hoje for diferente de dataRegistro
    return this.hoje !== dataRegistro;
  }

    
  dateFilter(date: Date | null): boolean {
    if (!date) {
       return true; // Permite que todas as datas sejam válidas até que uma seja selecionada
   }
   const day = date.getDay();
   return day != 0 && day != 6;
}
}
