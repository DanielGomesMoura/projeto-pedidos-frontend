import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PagamentoService } from 'src/app/services/pagamento.service';

@Component({
  selector: 'app-pagamento-create',
  templateUrl: './pagamento-create.component.html',
  styleUrls: ['./pagamento-create.component.css']
})
export class PagamentoCreateComponent implements OnInit {

   pagamentoForm: FormGroup;
  isEditMode: boolean = false;
  tipoPagamento: [] = [];

  constructor(private service: PagamentoService,
              private toast: ToastrService, 
              private router: Router,
              private activatedRout: ActivatedRoute,
              private currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
    this.pagamentoForm = new FormGroup({
      id:           new FormControl(null),
      pedido_fk:   new FormControl(1,Validators.required),
      valor_pagamento: new FormControl(null, Validators.required),
      tipo_pagamento:  new FormControl(null, Validators.required)
    });

    const id = this.activatedRout.snapshot.paramMap.get('id');
    if(id){
      this.pagamentoForm.patchValue({id});
      //this.findById(id);
      this.isEditMode = true;
    }
   // this.findCliente();
  }

 //  findCliente():void{
 //   this.service.findAll().subscribe((data: Cliente[]) => {
  //    this.clientes = data;
   // });
  //}

  formatarMoeda(obj: number | string){
    const formattedValorCusto = this.currencyPipe.transform(obj, 'BRL', '', '1.2-2');
    return formattedValorCusto;
}

parseMoeda(valor: string): number {
// Remove todos os pontos e substitui a vírgula por ponto
const valorNumerico = valor.replace(/\./g, '').replace(',', '.');
  return parseFloat(valorNumerico);
}

moeda(campo: string, obj: any): void {
  let value = obj.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  value = (value / 100).toFixed(2) + ''; // Adiciona duas casas decimais
  value = value.replace('.', ','); // Substitui o ponto pela vírgula
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adiciona os pontos de milhar
  obj.value = value; // Atualiza o valor no campo

   // Atualiza o valor no campo do formulário
   this.pagamentoForm.get(campo)?.setValue(obj.value, { emitEvent: false });
  // Valida o formato após a atualização
  if (!this.validarMoeda(obj)) {
    // Se precisar de uma ação adicional, você pode adicionar aqui
  }
}

// Função para validar o formato da moeda
validarMoeda(control: any): { [key: string]: boolean } | null {
  const regex = /^\d{1,3}(\.\d{3})*,\d{2}$/;
  const isValid = regex.test(control.value);
  return isValid ? null : { moedaInvalida: true };
}

  save(): void {
    if (this.isEditMode) {
    } else {
      this.create();
    }
  }

  create(): void {
    const formValue = this.pagamentoForm.value;
    
   // Converte os valores formatados de volta para double
   formValue.valor_pagamento = this.parseMoeda(formValue.valor_pagamento);
   formValue.pedido_fk = 1;

    this.service.create(this.pagamentoForm.value).subscribe(resposta => {
      this.toast.success('Pagamento cadastrado com sucesso');
      this.router.navigate(['pedidos']);
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
    return this.pagamentoForm.valid
  }
}

