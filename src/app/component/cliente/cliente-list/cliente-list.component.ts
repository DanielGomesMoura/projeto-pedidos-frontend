import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
//import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
@Component({
    selector: 'app-cliente-list',
    templateUrl: './cliente-list.component.html',
    styleUrls: ['./cliente-list.component.css'],
    standalone: true,
    imports: [MatFabButton, RouterLink, MatIcon, MatFormField, MatLabel, MatInput, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator]
})
export class ClienteListComponent implements OnInit {

  ELEMENT_DATA: Cliente[] = []

  cliente: Cliente = {
    id: '',
    nome: '',
    email: ''
  }

  displayedColumns: string[] = ['id', 'nome', 'email','acoes'];
  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ClienteService,
              private toast: ToastrService,
              private dialog: MatDialog
             ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findById(): void{
    this.service.findById(this.cliente.id).subscribe(resposta =>{
      this.cliente = resposta
    })
  }

  findAll(){
    this.service.findAll().subscribe(resposta => {
    this.ELEMENT_DATA = resposta 
    this.dataSource = new MatTableDataSource<Cliente>(resposta);
    this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}