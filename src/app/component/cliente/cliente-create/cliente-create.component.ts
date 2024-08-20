import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    email: ''
  }

  isEditMode: boolean = false;

  nome: FormControl =  new FormControl(null, Validators.minLength(3));
  email: FormControl = new FormControl(null, Validators.email);

  constructor(private service: ClienteService,
              private toast: ToastrService, 
              private router: Router,
              private activatedRout: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRout.snapshot.paramMap.get('id');
    if(id){
      this.cliente.id = id
      this.findById();
      this.isEditMode = true;
    }
  }

  findById(): void{
    this.service.findById(this.cliente.id).subscribe(resposta =>{
      this.cliente = resposta
    })
  }

  save(): void {
    if (this.cliente.id) {
      this.update();
    } else {
      this.create();
    }
  }

  update(): void {
    this.service.update(this.cliente).subscribe(() => {
      this.toast.success('Cliente atualizado com sucesso','Update');
      this.router.navigate(['clientes']);
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

  create(): void {
    this.service.create(this.cliente).subscribe(resposta => {
      this.toast.success('Cliente cadastrado com sucesso');
      this.router.navigate(['clientes']);
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
  
  validaCampos(): boolean { 
    return this.nome.valid && this.email.valid
  }
}
