import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PedidoService } from 'src/app/services/pedido.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-pedido-create',
  templateUrl: './pedido-create.component.html',
  styleUrls: ['./pedido-create.component.css']
})
export class PedidoCreateComponent implements OnInit {

  pedidoForm: FormGroup;
  isEditMode: boolean = false;
  clientes: Cliente[] = [];

  constructor(private service: PedidoService,
              private clienteService: ClienteService,
              private toast: ToastrService, 
              private router: Router,
              private activatedRout: ActivatedRoute,
              private currencyPipe: CurrencyPipe ) { }

  ngOnInit(): void {
    this.pedidoForm = new FormGroup({
      id:           new FormControl(null),
      cliente_fk:   new FormControl(null,Validators.required),
      valor_total:  new FormControl(null, Validators.required)
    })

    const id = this.activatedRout.snapshot.paramMap.get('id');
    if(id){
      this.pedidoForm.patchValue({id});
      this.findById(id);
      this.isEditMode = true;
    }
    this.findCliente();
  }

  findCliente():void{
    this.clienteService.findAll().subscribe((data: Cliente[]) => {
      this.clientes = data;
    });
  }

  findById(id: string): void{
    this.service.findById(id).subscribe(resposta =>{
      this.pedidoForm.patchValue({
        cliente_fk: resposta.cliente_fk,
        valor_total: this.formatarMoeda(resposta.valor_total)
      });
    })
  }

  moeda(campo: string, obj: any): void {
    let value = obj.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    value = (value / 100).toFixed(2) + ''; // Adiciona duas casas decimais
    value = value.replace('.', ','); // Substitui o ponto pela vírgula
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adiciona os pontos de milhar
    obj.value = value; // Atualiza o valor no campo
  
     // Atualiza o valor no campo do formulário
     this.pedidoForm.get(campo)?.setValue(obj.value, { emitEvent: false });
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

  formatarMoeda(obj: number | string){
    const formattedValorCusto = this.currencyPipe.transform(obj, 'BRL', '', '1.2-2');
    return formattedValorCusto;
}

parseMoeda(valor: string): number {
// Remove todos os pontos e substitui a vírgula por ponto
const valorNumerico = valor.replace(/\./g, '').replace(',', '.');
  return parseFloat(valorNumerico);
}

  save(): void {
    if (this.isEditMode) {
      this.update();
    } else {
      this.create();
    }
  }

  update(): void {
    const formValue = this.pedidoForm.value;

    // Converte os valores formatados de volta para double
    formValue.valor_total = this.parseMoeda(formValue.valor_total);

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
    const formValue = this.pedidoForm.value;
    // Converte os valores formatados de volta para double
    formValue.valor_total = this.parseMoeda(formValue.valor_total);

    this.service.create(this.pedidoForm.value).subscribe(resposta => {
      this.toast.success('Pedido cadastrado com sucesso');
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
    return this.pedidoForm.valid
  }

}
