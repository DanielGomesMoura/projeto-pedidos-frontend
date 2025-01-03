import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContaService } from 'src/app/services/conta.service';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-conta-create',
    templateUrl: './conta-create.component.html',
    styleUrls: ['./conta-create.component.css'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatIcon, MatSuffix, MatButton, RouterLink]
})
export class ContaCreateComponent implements OnInit {

   contaForm: FormGroup;

  isEditMode: boolean = false;

  constructor(private service: ContaService,
              private toast: ToastrService, 
              private router: Router,
              private activatedRout: ActivatedRoute) { }

  ngOnInit(): void {
    // Inicializando o FormGroup com os FormControl correspondentes
    this.contaForm = new FormGroup({
      id: new FormControl(null),
      conta: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    });

    // Verifica se está no modo de edição
    const id = this.activatedRout.snapshot.paramMap.get('id');
    if (id) {
      this.contaForm.patchValue({id});
      this.findById(id);
      this.isEditMode = true;
    }
  }

  findById(id: string): void{
    this.service.findById(id).subscribe(resposta =>{
      this.contaForm.patchValue({
        conta: resposta.conta
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
    const formValue = this.contaForm.value;

    formValue.conta = formValue.conta.toUpperCase();

    this.service.update(this.contaForm.value).subscribe(() => {
      this.toast.success('Conta atualizada com sucesso','Update');
      this.router.navigate(['contas']);
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
    const formValue = this.contaForm.value;

    formValue.conta = formValue.conta.toUpperCase();
    
    this.service.create(this.contaForm.value).subscribe(resposta => {
      this.toast.success('Conta cadastrada com sucesso');
      this.router.navigate(['contas']);
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
    return this.contaForm.valid;
  }
}
