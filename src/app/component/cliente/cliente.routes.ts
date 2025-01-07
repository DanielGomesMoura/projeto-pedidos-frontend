import { Routes } from "@angular/router";
import { ClienteListComponent } from "./cliente-list/cliente-list.component";
import { ClienteCreateComponent } from "./cliente-create/cliente-create.component";

export const CLIENTE_ROUTES:  Routes = [
      {path: 'clientes',            component:  ClienteListComponent},
      {path: 'clientes/create',     component: ClienteCreateComponent},
      {path: 'clientes/update/:id', component: ClienteCreateComponent}
];