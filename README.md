# Mundo de Libras - Parintins

Site educacional para aprendizado de Libras (Língua Brasileira de Sinais) focado em sinais de Parintins.

## Estrutura do Projeto

```
Site de libras/
├── index.html              # Página principal do site
├── .gitignore             # Arquivos ignorados pelo Git
├── .nojekyll              # Desabilita Jekyll no GitHub Pages
├── README.md              # Este arquivo
├── css/
│   └── styles.css         # Estilos do site
├── js/
│   └── main.js            # Funcionalidades JavaScript
├── assets/
│   └── images/
│       └── site/          # Recursos do site (fundo, logo)
└── content/               # Conteúdo organizado por categoria
    ├── saudacoes/
    │   ├── images/        # Imagens de saudações
    │   └── videos/        # Vídeos de saudações
    ├── dias-semana/
    │   ├── images/        # Imagens dos dias da semana
    │   └── videos/        # Vídeos dos dias da semana
    ├── informatica/
    │   ├── images/        # Imagens sobre informática
    │   └── videos/        # Vídeos sobre informática
    ├── agro/
    │   ├── images/        # Imagens sobre agro e sustentabilidade
    │   └── videos/        # Vídeos sobre agro e sustentabilidade
    ├── turismo/
    │   ├── images/        # Imagens de pontos turísticos
    │   └── videos/        # Vídeos de pontos turísticos
    └── cultura/
        ├── images/        # Imagens sobre cultura de Parintins
        └── videos/        # Vídeos sobre cultura de Parintins
```

## Categorias de Conteúdo

### 📢 Saudações e Expressões
- Oi, Olá, Bom dia, Boa tarde, Boa noite, Boa madrugada
- Tchau, Obrigado(a), Desculpa, Com licença
- Prazer em conhecer, Tudo bem, Comprimentos

### 📅 Dias da Semana
- Semana
- Domingo, Segunda-feira, Terça-feira, Quarta-feira
- Quinta-feira, Sexta-feira, Sábado

### 💻 Informática
- Informática, Aplicativo, Banco de Dados
- Programação, Linguagem de Programação

### 🌱 Agro e Sustentabilidade
- Agropecuária, Irrigação, Sustentabilidade
- Adubação, Agricultura Familiar

### 🏛️ Pontos Turísticos de Parintins
- Ponto Turístico, Catedral
- Canta Galo, Mercado Municipal

### 🎭 Cultura de Parintins
- Boi Caprichoso, Boi Garantido
- Bumbódromo

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- FormSubmit para formulário de feedback

## Como Usar Localmente

1. Clone o repositório ou baixe os arquivos
2. Abra o arquivo `index.html` em um navegador web moderno
3. Navegue pelas diferentes categorias de sinais de Libras

## Hospedagem no GitHub Pages

### Passo 1: Criar Repositório

1. Acesse [GitHub](https://github.com)
2. Clique em "New repository"
3. Nomeie o repositório (ex: `libras-parintins`)
4. Marque como "Public"
5. Clique em "Create repository"

### Passo 2: Fazer Upload dos Arquivos

No terminal, dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "Primeiro commit: Site de Libras Parintins"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/libras-parintins.git
git push -u origin main
```

### Passo 3: Ativar GitHub Pages

1. No repositório, vá em "Settings"
2. No menu lateral, clique em "Pages"
3. Em "Source", selecione "main" branch
4. Clique em "Save"
5. Aguarde alguns minutos e seu site estará disponível em:
   `https://SEU-USUARIO.github.io/libras-parintins/`

## Estrutura de Dados

Cada categoria contém:
- **Imagens**: Passos do sinal em LIBRAS (formato JPG)
- **Vídeos**: Demonstração completa do sinal (formato MP4)

## Manutenção

### Adicionar Novo Sinal

1. Adicione as imagens em `content/[categoria]/images/`
2. Adicione o vídeo em `content/[categoria]/videos/`
3. Edite o `index.html` e adicione o novo sinal na seção correspondente

### Adicionar Nova Categoria

1. Crie as pastas: `content/nova-categoria/images/` e `content/nova-categoria/videos/`
2. Adicione o conteúdo
3. Edite o `index.html` para incluir a nova seção

## Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovoSinal`)
3. Commit suas mudanças (`git commit -m 'Adiciona novo sinal'`)
4. Push para a branch (`git push origin feature/NovoSinal`)
5. Abra um Pull Request

## Licença

Este projeto é educacional e sem fins lucrativos, dedicado ao ensino de LIBRAS.

## Contato

Para sugestões ou feedback, use o formulário de contato no site ou envie email para: welersonbatistadesouza@gmail.com

---

Desenvolvido com dedicação para promover a inclusão através da Língua Brasileira de Sinais.
