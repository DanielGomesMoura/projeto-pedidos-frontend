import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Pedido } from 'src/app/models/pedido';
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
    nome: '',
    quantidade: 0,
  }

  displayedColumns: string[] = ['nome', 'quantidade'];
dataSource = new MatTableDataSource<Rank>(this.ELEMENT_DATA);

  constructor(private service: RankSerivice,
              private toast: ToastrService,
              private dialog: MatDialog
             ) { }

   ngOnInit(): void {
    this.findAll();
  }

   findAll(){
    this.service.Rank().subscribe(resposta => {
    this.ELEMENT_DATA = resposta 
    this.dataSource = new MatTableDataSource<Rank>(resposta);
    })
  }
}
