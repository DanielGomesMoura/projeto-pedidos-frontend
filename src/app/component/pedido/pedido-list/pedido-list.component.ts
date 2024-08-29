import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.css']
})
export class PedidoListComponent implements OnInit {

  ELEMENT_DATA: Pedido[] = []

  pedido: Pedido = {
    id: '',
    data_registro: '',
    valor_total: '',
    cliente_fk: null,
    status: '',
    nomeCliente: ''
  }

  displayedColumns: string[] = ['id', 'cliente', 'data_registro', 'valor_total', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Pedido>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: PedidoService,
              private toast: ToastrService,
              private dialog: MatDialog,
              private currencyPipe: CurrencyPipe,
              private router: Router
             ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findById(): void{
    this.service.findById(this.pedido.id).subscribe(resposta =>{
      this.pedido = resposta
    })
  }

  redirectToPagamentos(elementId: number) {
  this.router.navigate(['/pagamentos']);
}

  findAll(){
    this.service.findAll().subscribe(resposta => {
    
   const formatarResposta = resposta.map((pedido: Pedido) =>{
      return{
      ...pedido,
      valor_total: this.formatarMoeda(pedido.valor_total)
      };
    });
    
    this.ELEMENT_DATA = formatarResposta 
    this.dataSource = new MatTableDataSource<Pedido>(formatarResposta);
    this.dataSource.paginator = this.paginator;
    })
  }

  formatarMoeda(obj: number | string){
    const formattedValorCusto = this.currencyPipe.transform(obj, 'BRL', 'symbol', '1.2-2');
    const valorCustoComVirgula = formattedValorCusto
    const valorCustoComEspaco = valorCustoComVirgula ? 
    valorCustoComVirgula.replace('R$', 'R$ ') : '';
    return valorCustoComEspaco;
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
