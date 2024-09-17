FROM node:14.15.0 as build-stage

WORKDIR /app

# Copia o código do projeto para o contêiner
COPY . .

# Instala as dependências
RUN npm install
RUN npm run build

# Etapa 2: Servir a aplicação
 FROM nginx:alpine

 COPY --from=build-stage /app/dist/brigadeiro /usr/share/nginx/html
 COPY nginx.conf /etc/nginx/nginx.conf
 EXPOSE 80

CMD ["nginx", "-g","daemon off;"]