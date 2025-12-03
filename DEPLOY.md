# Guia Rápido de Deploy - GitHub Pages

## Pré-requisitos

- Conta no GitHub
- Git instalado no computador

## Comandos para Deploy

### 1. Inicializar o repositório Git (executar apenas uma vez)

```bash
cd "c:\Users\mathe\Downloads\libras\Site de libras"
git init
git add .
git commit -m "Initial commit: Site de Libras Parintins"
```

### 2. Criar repositório no GitHub

1. Acesse https://github.com/new
2. Nome do repositório: `libras-parintins` (ou outro nome de sua escolha)
3. Deixe como **Public**
4. **NÃO** marque "Add a README file"
5. Clique em "Create repository"

### 3. Conectar e fazer upload

Copie a URL do seu repositório (algo como: `https://github.com/SEU-USUARIO/libras-parintins.git`)

```bash
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/libras-parintins.git
git push -u origin main
```

### 4. Ativar GitHub Pages

1. Vá para o repositório no GitHub
2. Clique em **Settings** (Configurações)
3. No menu lateral esquerdo, clique em **Pages**
4. Em **Source** (Origem):
   - Branch: selecione `main`
   - Folder: selecione `/ (root)`
5. Clique em **Save**

### 5. Acessar o site

Após alguns minutos, seu site estará disponível em:
```
https://SEU-USUARIO.github.io/libras-parintins/
```

## Atualizações Futuras

Sempre que fizer alterações no projeto:

```bash
git add .
git commit -m "Descrição das alterações"
git push
```

O GitHub Pages será atualizado automaticamente em alguns minutos.

## Verificar Status do Deploy

1. Vá para o repositório no GitHub
2. Clique na aba **Actions**
3. Verifique se o deploy está "verde" (sucesso)

## Problemas Comuns

### Site não carrega

- Verifique se o GitHub Pages está ativado em Settings > Pages
- Aguarde 5-10 minutos após o primeiro deploy
- Limpe o cache do navegador (Ctrl+Shift+R)

### Imagens não aparecem

- Verifique se os caminhos no HTML estão corretos (começam com `content/` ou `assets/`)
- Certifique-se de que todas as imagens foram commitadas

### Vídeos não reproduzem

- Verifique o tamanho dos vídeos (GitHub tem limite de 100MB por arquivo)
- Use Git LFS para arquivos grandes (opcional)

## Contato

Para dúvidas sobre o deploy, consulte a [documentação oficial do GitHub Pages](https://docs.github.com/pt/pages).
