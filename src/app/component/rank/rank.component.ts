import { WebSocketService } from './../../services/web-socket.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource as MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Rank } from 'src/app/models/rank';
import { RankSerivice } from 'src/app/services/rank.service';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {

  ELEMENT_DATA: Rank[] = []

  rank: Rank = {
    rowId: 0,
    nome: '',
    quantidade: 0,
  }

  displayedColumns: string[] = ['rowId','nome', 'quantidade'];
dataSource = new MatTableDataSource<Rank>(this.ELEMENT_DATA);

 @ViewChild(MatPaginator) paginator: MatPaginator;

 ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private service: RankSerivice,
              private toast: ToastrService,
              private dialog: MatDialog,
              private WebSocketService: WebSocketService
             ) { }

   ngOnInit(): void {
     this.findAll();
     this.WebSocketService.messages.subscribe(message => {
      // Atualize a UI com a mensagem recebida
      if(message == "Ranking atualizado"){
        this.findAll();
     }
   });
}

   findAll(){
    this.service.Rank().subscribe(resposta => {
    this.ELEMENT_DATA = resposta 
    this.dataSource.data = this.ELEMENT_DATA;
    })
  }
}
