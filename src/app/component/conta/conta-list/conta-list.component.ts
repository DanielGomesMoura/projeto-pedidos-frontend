import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import { MatPaginator as MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource as MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Conta } from 'src/app/models/conta';
import { ContaService } from 'src/app/services/conta.service';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'app-conta-list',
    templateUrl: './conta-list.component.html',
    styleUrls: ['./conta-list.component.css'],
    standalone: true,
    imports: [MatFabButton, RouterLink, MatIcon, MatFormField, MatLabel, MatInput, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator]
})
export class ContaListComponent implements OnInit {

  ELEMENT_DATA: Conta[] = []

  conta: Conta = {
    id: '',
    conta: ''
  }

  displayedColumns: string[] = ['id', 'conta','acoes'];
  dataSource = new MatTableDataSource<Conta>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ContaService,
              private toast: ToastrService,
              private dialog: MatDialog
             ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findById(): void{
    this.service.findById(this.conta.id).subscribe(resposta =>{
      this.conta = resposta
    })
  }

  findAll(){
    this.service.findAll().subscribe(resposta => {
    this.ELEMENT_DATA = resposta 
    this.dataSource = new MatTableDataSource<Conta>(resposta);
    this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

