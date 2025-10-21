# Projeto ONG: Esperança Viva

![Status](https://img.shields.io/badge/Status-Conclu%C3%ADdo-brightgreen?style=for-the-badge)
![Versão](https://img.shields.io/github/v/release/flaviosan-dev/ONG_Esperanca_Viva?style=for-the-badge&label=Vers%C3%A3o)

Este repositório é a entrega final e consolidada do website para a **ONG Esperança Viva**, um projeto desenvolvido para a disciplina de **Desenvolvimento Front-End Para Web**.

O projeto evoluiu de um site estático para uma **aplicação web dinâmica (SPA)**, consolidando práticas de HTML semântico, um Sistema de Design robusto (CSS) e JavaScript avançado. A entrega final foca em **acessibilidade (WCAG 2.1 AA)**, **versionamento profissional (GitFlow)** e **otimização para produção**.

---

## 🚀 Deploy em Produção (GitHub Pages)

O site está publicado e acessível em ambiente de produção no link abaixo:

**[➡️ Acessar o Site](https://flaviosan-dev.github.io/ONG_Esperanca_Viva/)**

---

## 📖 Índice

* [Evolução do Projeto](#-evolução-do-projeto)
* [Recursos e Funcionalidades Principais](#-recursos-e-funcionalidades-principais)
  * [Arquitetura (SPA) e Funcionalidades Dinâmicas](#arquitetura-spa-e-funcionalidades-dinâmicas)
  * [Sistema de Design (Design System)](#sistema-de-design-design-system)
  * [Biblioteca de Componentes (UI Kit)](#biblioteca-de-componentes-ui-kit)
* [Requisitos Técnicos Implementados](#-requisitos-técnicos-implementados)
  * [1. Controle de Versão (Git/GitHub)](#1-controle-de-versão-com-gitgithub)
  * [2. Acessibilidade (WCAG 2.1 Nível AA)](#2-acessibilidade-wcag-21-nível-aa)
  * [3. Otimização para Produção](#3-otimização-para-produção)
* [Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [Como Executar Localmente](#-como-executar-localmente)
* [Autor](#-autor)

---

## 📈 Evolução do Projeto

O desenvolvimento foi dividido em etapas para simular um processo de build iterativo, onde cada fase teve um foco específico:

* **Parte 1 (HTML):** Foco na estrutura semântica (HTML5). Foram criadas as 3 páginas/seções (`index.html`, `projetos.html`, `cadastro.html`, `sobre.html`), garantindo uma hierarquia de títulos lógica e o uso de imagens.

* **Parte 2 (CSS):** Foco na camada de apresentação. Implementação de um **Sistema de Design (Design System)** completo com variáveis CSS, paleta de cores (+8), hierarquia tipográfica (+5 tamanhos) e espaçamento modular. Criação dos **leiautes responsivos** (Mobile-First) usando CSS Grid para a estrutura principal (12 colunas) e Flexbox para componentes internos (cards, menus, etc.), abrangendo 5 breakpoints definidos.

* **Parte 3 (JavaScript Avançado):** Foco na transformação do site em uma aplicação dinâmica.
    * Implementação de um sistema de **Single Page Application (SPA) básico**, onde a navegação entre seções não recarrega a página.
    * Criação de um **sistema de templates JavaScript** para renderizar conteúdo dinamicamente (como a lista de projetos).
    * Desenvolvimento de um **sistema de verificação de consistência de dados** avançado para o formulário de cadastro, com avisos interativos ao usuário sobre preenchimento incorreto (indo além da validação nativa do HTML5).

* **Parte 4 (Entrega Final):** Consolidação do código, aplicação rigorosa dos requisitos de Acessibilidade (WCAG), Otimização de performance e setup de um fluxo de Git profissional (GitFlow, Issues, Releases).

---

## ✨ Recursos e Funcionalidades Principais

O projeto é composto por uma arquitetura dinâmica, um sistema de design robusto e uma biblioteca de componentes reutilizáveis.

### Arquitetura (SPA) e Funcionalidades Dinâmicas

* **Single Page Application (SPA):** O site funciona como uma SPA. A navegação entre "Início", "Projetos" e "Cadastro" é gerenciada por JavaScript, que atualiza dinamicamente o conteúdo da página principal sem a necessidade de recarregamento (carregamento do `index.html` e gerenciamento do conteúdo via JS).
* **Templates JavaScript:** O conteúdo, como os cards de projetos na seção `projetos.html`, é renderizado usando templates JavaScript, permitindo que os dados sejam facilmente gerenciados ou até mesmo carregados de uma fonte externa (como um JSON).
* **Validação Avançada de Formulários:** O formulário de cadastro (`cadastro.html`) possui uma camada dupla de verificação:
    1.  **Validação Nativa (HTML5):** Para feedback rápido (ex: `required`, `type="email"`).
    2.  **Verificação de Consistência (JavaScript):** Um sistema que verifica a lógica e a consistência dos dados (ex: CPF válido, CEP correlacionado), exibindo avisos claros ao usuário em caso de preenchimento incorreto.

### Sistema de Design (Design System)

O projeto foi construído sobre um Design System consistente, utilizando **Variáveis CSS Customizadas** (`:root`) para garantir manutenção e escalabilidade:

* **Paleta de Cores:** Definição de mais de 8 cores (primárias, secundárias, neutras, feedback) para uso global.
* **Tipografia:** Hierarquia tipográfica com 5 tamanhos de fonte distintos, aplicados semanticamente.
* **Espaçamento:** Sistema de espaçamento modular (ex: 8px, 16px, 24px) para consistência em `margin` e `padding`.
* **Leiaute:** Sistema de grid customizado de 12 colunas, implementado com CSS Grid e Flexbox para alinhamentos.

### Biblioteca de Componentes (UI Kit)

Uma coleção de componentes reutilizáveis foi desenvolvida para garantir consistência visual e funcional:

* **Navegação:** Menu principal responsivo que se adapta para um menu hambúrguer em dispositivos móveis, incluindo submenus `dropdown`.
* **Cards:** Componente `card` responsivo para listagem de projetos sociais (renderizados via template JS).
* **Botões:** Sistema de botões com 4 estados visuais (`:hover`, `:focus`, `:active`, `:disabled`), garantindo feedback claro ao usuário.
* **Formulários:** Estilização completa de inputs com validação visual (CSS) para os estados de `success` e `error` disparados pelo JavaScript.
* **Feedback:** Componentes de `alerts` e `modals` para os avisos de validação de formulário.

---

## 🏅 Requisitos Técnicos Implementados

Esta seção detalha o cumprimento das especificações técnicas obrigatórias da entrega final.

### 1. Controle de Versão com Git/GitHub

O projeto foi gerenciado seguindo práticas profissionais de versionamento:

* **Estratégia de Branching (GitFlow):** O repositório foi estruturado com as branches `main` (para produção estável/releases) e `develop` (como branch principal de desenvolvimento). Novas funcionalidades foram desenvolvidas em branches `feature/*` e integradas via Pull Request.
* **Commits Semânticos:** Todo o histórico de commits segue o padrão [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (ex: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`) para garantir um histórico limpo e organizado.
* **Gerenciamento de Projeto:** `Issues` foram utilizadas para rastrear tarefas e `Pull Requests` documentados para revisão de código.

### 2. Acessibilidade (WCAG 2.1 Nível AA)

O site foi construído com o compromisso de ser acessível a todos os usuários, seguindo as diretrizes do WCAG 2.1 (Nível AA):

* **Navegação por Teclado:** Todos os componentes interativos (links, botões, formulários, dropdowns) são 100% navegáveis e operáveis utilizando apenas o teclado (tecla `Tab`).
* **Estrutura Semântica:** Uso correto de tags HTML5 (`<main>`, `<nav>`, `<section>`, `<footer>`, etc.) e gerenciamento de `aria-live` para atualizações de conteúdo na SPA.
* **Contraste de Cores:** Todos os textos cumprem o requisito mínimo de contraste de **4.5:1**, conforme definido no Sistema de Design.
* **Suporte a Leitores de Tela:** Todas as imagens possuem atributos `alt` descritivos e atributos `aria-*` foram utilizados para prover contexto adicional em componentes dinâmicos (como o menu mobile, modais e alertas de formulário).
* **Modos Alternativos:** O site implementa um **modo escuro (Dark Mode)** e uma **versão de alto contraste**, ambos projetados para manter os critérios de acessibilidade.

### 3. Otimização para Produção

Para garantir um carregamento rápido e eficiente em produção, as seguintes técnicas de otimização foram aplicadas:

* **Minificação:** Os arquivos de código (`HTML`, `CSS` e `JavaScript`) foram minificados para reduzir seu tamanho total e acelerar o parsing.
* **Compressão de Imagens:** Todas as imagens foram otimizadas (compressão sem perdas) e, sempre que possível, servidas em formatos modernos (como `.webp`) para balancear qualidade e performance.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5** (Semântico)
* **CSS3** (Variáveis Customizadas, CSS Grid, Flexbox, Media Queries)
* **JavaScript (ES6+)** (Manipulação do DOM, Eventos, Arquitetura SPA, JS Templating, Validação Avançada)
* **Git & GitHub** (Versionamento, GitFlow, GitHub Pages)
* **Ferramentas de Auditoria:** (Lighthouse, WAVE, Axe) para testes de acessibilidade e performance.

---

## 📂 Como Executar Localmente

1.  Clone este repositório:
    ```bash
    git clone [https://github.com/flaviosan-dev/ONG_Esperanca_Viva.git](https://github.com/flaviosan-dev/ONG_Esperanca_Viva.git)
    ```

2.  Navegue até o diretório do projeto:
    ```bash
    cd ONG_Esperanca_Viva
    ```

3.  Abra o arquivo `index.html` no seu navegador de preferência.

---

## 👤 Autor

**flaviosan-dev**

* [GitHub](https://github.com/flaviosan-dev)
* [LinkedIn](https://www.linkedin.com/in/flavio-vieira-/)
