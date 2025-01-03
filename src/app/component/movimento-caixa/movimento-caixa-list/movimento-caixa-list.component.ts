import { MovimentoCaixa } from './../../../models/movimento-caixa';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import { MatPaginator as MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource as MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatFooterCellDef, MatFooterCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MovimentoCaixaService } from 'src/app/services/movimento-caixa.service';
import { MatFabButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgStyle, CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-movimento-caixa-list',
    templateUrl: './movimento-caixa-list.component.html',
    styleUrls: ['./movimento-caixa-list.component.css'],
    standalone: true,
    imports: [MatFabButton, RouterLink, MatIcon, MatFormField, MatLabel, MatInput, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatFooterCellDef, MatFooterCell, NgStyle, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator, CurrencyPipe]
})
export class MovimentoCaixaListComponent implements OnInit {

 ELEMENT_DATA: MovimentoCaixa[] = []

  movimentoCaixa: MovimentoCaixa = {
    id: '',
    descricao: '',
    conta: '',
    tipo_recebimento: '',
    recebimento_fk: null,
    data_registro: '',
    tipo: '',
    valor: 0
  }

  displayedColumns: string[] = ['id', 'descricao', 'conta','tipo_recebimento','data_registro','valor','tipo'];
  dataSource = new MatTableDataSource<MovimentoCaixa>(this.ELEMENT_DATA);
   
  getTotalCost() {
    return this.ELEMENT_DATA.map(t => t.valor).reduce((acc, value) => Number(acc) + Number(value), 0);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: MovimentoCaixaService,
              private toast: ToastrService,
              private dialog: MatDialog
             ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findById(): void{
    this.service.findById(this.movimentoCaixa.id).subscribe(resposta =>{
      this.movimentoCaixa = resposta
    })
  }

  findAll(){
    this.service.findAll().subscribe(resposta => {
      // Formatar o valor como moeda e substituir o ponto por vírgula
       const formattedData = resposta.map((movimentoCaixa: MovimentoCaixa) => {
      
        return {
          ...movimentoCaixa,
          valor: movimentoCaixa.valor
        };
      });
      
      this.ELEMENT_DATA = formattedData;
      this.dataSource = new MatTableDataSource<MovimentoCaixa>(formattedData);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
