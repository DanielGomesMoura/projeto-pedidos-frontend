import { Routes } from "@angular/router";
import { ProdutoListComponent } from "./produto-list/produto-list.component";
import { ProdutoCreateComponent } from "./produto-create/produto-create.component";

export const PRODUTO_ROUTES:  Routes = [
      {path: 'produtos',            component:  ProdutoListComponent},
      {path: 'produtos/create',     component: ProdutoCreateComponent},
      {path: 'produtos/update/:id', component: ProdutoCreateComponent}
];