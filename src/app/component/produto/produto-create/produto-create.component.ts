import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {

  produtoForm: FormGroup;

  isEditMode: boolean = false;

  constructor(private service: ProdutoService,
              private toast: ToastrService, 
              private router: Router,
              private activatedRout: ActivatedRoute) { }

  ngOnInit(): void {
    this.produtoForm = new FormGroup({
      id:          new FormControl(null),
      descricao:   new FormControl(null,Validators.minLength(3)),
      unidade:     new FormControl(null, Validators.required),
      valor_custo: new FormControl(null, Validators.required),
      valor_venda: new FormControl(null, Validators.required),
    })

    const id = this.activatedRout.snapshot.paramMap.get('id');
    if(id){
      this.produtoForm.patchValue({id});
      this.findById(id);
      this.isEditMode = true;
    }
  }

  findById(id: string): void{
    this.service.findById(id).subscribe(resposta =>{
      this.produtoForm.patchValue({
        descricao: resposta.descricao,
        unidade: resposta.unidade,
        valor_custo: resposta.valor_custo,
        valor_venda: resposta.valor_venda
      });
    })
  }

  save(): void {
    if (this.isEditMode) {
      this.update();
    } else {
      this.create();
    }
  }

  update(): void {
    this.service.update(this.produtoForm.value).subscribe(() => {
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
    this.service.create(this.produtoForm.value).subscribe(resposta => {
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
    return this.produtoForm.valid
  }
}
