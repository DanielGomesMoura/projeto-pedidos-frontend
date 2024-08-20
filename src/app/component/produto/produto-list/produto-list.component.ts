import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {

  ELEMENT_DATA: Produto[] = []

  produto: Produto = {
    id: '',
    descricao: '',
    unidade: '',
    valor_custo: '',
    valor_venda: '',
  }

  displayedColumns: string[] = ['id', 'descricao', 'unidade','valor_custo','valor_venda','acoes'];
  dataSource = new MatTableDataSource<Produto>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ProdutoService,
              private toast: ToastrService,
              private dialog: MatDialog,
              private currencyPipe: CurrencyPipe 
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
        const formattedValorCusto = this.currencyPipe.transform(produto.valor_custo, 'BRL', 'symbol', '1.2-2');
        const valorCustoComVirgula = formattedValorCusto ? formattedValorCusto.replace('.', ',') : '';
        const valorCustoComEspaco = valorCustoComVirgula ? 
        valorCustoComVirgula.replace('R$', 'R$ ') : '';
        const formattedValorvenda = this.currencyPipe.transform(produto.valor_venda, 'BRL', 'symbol', '1.2-2');
        const valorVendaComVirgula = formattedValorvenda ? formattedValorvenda.replace('.', ',') : '';
        const valorVendaComEspaco = valorVendaComVirgula ? 
        valorCustoComVirgula.replace('R$', 'R$ ') : ''; 
        
        return {
          ...produto,
          valor_custo: valorCustoComEspaco,
          valor_venda: valorVendaComEspaco
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
}
