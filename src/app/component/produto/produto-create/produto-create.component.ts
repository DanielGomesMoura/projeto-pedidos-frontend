import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from 'src/app/services/produto.service';
import { CurrencyPipe } from '@angular/common';

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
              private activatedRout: ActivatedRoute,
              private currencyPipe: CurrencyPipe ) { }

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
        valor_custo: this.formatarMoeda(resposta.valor_custo),
        valor_venda: this.formatarMoeda(resposta.valor_venda)
      });
    })
  }

  formatarMoeda(obj: number | string){
    const formattedValorCusto = this.currencyPipe.transform(obj, 'BRL', '', '1.2-2');
    const valorCustoComVirgula = formattedValorCusto
    const valorCustoComEspaco = valorCustoComVirgula
    return valorCustoComEspaco;
}

parseMoeda(valor: string): number {
  if (!valor) return 0;
  return parseFloat(valor);
}

  save(): void {
    if (this.isEditMode) {
      this.update();
    } else {
      this.create();
    }
  }

  update(): void {
    const formValue = this.produtoForm.value;

    // Converte os valores formatados de volta para double
    formValue.valor_custo = this.parseMoeda(formValue.valor_custo);
    formValue.valor_venda = this.parseMoeda(formValue.valor_venda);

    this.service.update(formValue).subscribe(() => {
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
