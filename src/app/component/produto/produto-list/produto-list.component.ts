import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import { MatPaginator as MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource as MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CurrencyPipe } from '@angular/common';
import { ConfirmDialogComponentComponent } from '../../confirm-dialog-component/confirm-dialog-component.component';

@Component({
    selector: 'app-produto-list',
    templateUrl: './produto-list.component.html',
    styleUrls: ['./produto-list.component.css'],
    standalone: true,
    imports: [MatFabButton, RouterLink, MatIcon, MatFormField, MatLabel, MatInput, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator, CurrencyPipe]
})
export class ProdutoListComponent implements OnInit {

  ELEMENT_DATA: Produto[] = []

  produto: Produto = {
    id: '',
    descricao: '',
    unidade: '',
    valor_custo: 0,
    valor_venda: 0,
    valor_promocional: 0,
  }

  displayedColumns: string[] = ['id', 'descricao', 'unidade','valor_custo','valor_venda','acoes'];
  dataSource = new MatTableDataSource<Produto>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ProdutoService,
              private toast: ToastrService,
              private dialog: MatDialog
             ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findById(): void{
    this.service.findById(this.produto.id).subscribe(resposta =>{
      this.produto = resposta
    })
  }

  findAll(){
    this.service.findAll().subscribe(resposta => {
      // Formatar o valor como moeda e substituir o ponto por vírgula
       const formattedData = resposta.map((produto: Produto) => {
      
        return {
          ...produto,
          valor_custo: produto.valor_custo,

          valor_venda: produto.valor_venda
        };
      });
      
      this.ELEMENT_DATA = formattedData;
      this.dataSource = new MatTableDataSource<Produto>(formattedData);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(produto: Produto): void{
      const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      data: "Tem certeza que deseja remover esse Produto?",
      });
      dialogRef.afterClosed().subscribe( (resposta: boolean)=>{
        if(resposta){
          this.service.delete(produto.id).subscribe(() =>{
            this.toast.success('Produto Deletado com sucesso','REMOVIDO')
            this.findAll();
          },ex => {
            if(ex.error.errors){
              ex.error.errors.forEach(element => {
                this.toast.error(element.message);
              });
            }else{
              this.toast.error(ex.error.message);
            }
          })
        }
      })
    }
}
