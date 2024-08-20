import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {

  produto: Produto = {
    id: '',
    descricao: '',
    unidade: '',
    valor_custo: 0,
    valor_venda: 0,
  }

  isEditMode: boolean = false;

  descricao: FormControl =  new FormControl(null, Validators.minLength(3));
  unidade: FormControl = new FormControl(null, Validators.required);
  valor_custo: FormControl = new FormControl(null, Validators.required);
  valor_venda: FormControl = new FormControl(null, Validators.required);

  constructor(private service: ProdutoService,
              private toast: ToastrService, 
              private router: Router,
              private activatedRout: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRout.snapshot.paramMap.get('id');
    if(id){
      this.produto.id = id
      this.findById();
      this.isEditMode = true;
    }
  }

  findById(): void{
    this.service.findById(this.produto.id).subscribe(resposta =>{
      this.produto = resposta
    })
  }

  save(): void {
    if (this.produto.id) {
      this.update();
    } else {
      this.create();
    }
  }

  update(): void {
    this.service.update(this.produto).subscribe(() => {
      this.toast.success('Produto atualizado com sucesso','Update');
      this.router.navigate(['produtos']);
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
    this.service.create(this.produto).subscribe(resposta => {
      this.toast.success('Produto cadastrado com sucesso');
      this.router.navigate(['produtos']);
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
    return this.descricao.valid && this.unidade.valid && this.valor_custo.valid && this.valor_venda.valid
  }
}
