/* =================================== */
/* ARQUIVO PRINCIPAL DE SCRIPT (JS)    */
/* =================================== */

// Aguarda o DOM carregar ANTES de executar qualquer função
document.addEventListener("DOMContentLoaded", () => {
    // console.log("DOM Carregado. Iniciando scripts..."); 
    
    initMenuHamburger();    // Inicia o menu
    initFormularioMascaras(); // Inicia as máscaras
    initModalValidacao();   // Inicia o modal de validação
    initTemplateProjetos(); // Inicia o template da pág. de projetos
    initSPA();              // Inicia a navegação SPA
});

/* =================================== */
/* FUNCIONALIDADE 1: MENU HAMBÚRGUER   */
/* =================================== */
function initMenuHamburger() {
    const botaoHamburger = document.querySelector('.menu-hamburger');
    const navMobile = document.querySelector('.navegacao-mobile');

    if (botaoHamburger && navMobile) {
        botaoHamburger.addEventListener('click', () => {
            botaoHamburger.classList.toggle('active');
            navMobile.classList.toggle('active');
        });
    }
}

/* =================================== */
/* FUNCIONALIDADE 2: MÁSCARAS DE INPUT */
/* =================================== */
function initFormularioMascaras() {
    // Só executa se encontrar inputs com name="cpf" (provavelmente só na pág cadastro)
    const inputsCpf = document.querySelectorAll('input[name="cpf"]');
    if(inputsCpf.length > 0) {
        inputsCpf.forEach(input => {
            input.addEventListener('input', (e) => {
                e.target.value = mascaraCPF(e.target.value);
            });
        });
    }

    const inputsTel = document.querySelectorAll('input[type="tel"]');
     if(inputsTel.length > 0) {
        inputsTel.forEach(input => {
            input.addEventListener('input', (e) => {
                e.target.value = mascaraTelefone(e.target.value);
            });
        });
    }

    const inputsCep = document.querySelectorAll('input[name="cep"]');
     if(inputsCep.length > 0) {
        inputsCep.forEach(input => {
            input.addEventListener('input', (e) => {
                e.target.value = mascaraCEP(e.target.value);
            });
        });
    }
}

/* --- Funções Auxiliares de Máscara --- */
function mascaraCPF(value) {
  let v = value.replace(/\D/g, ''); 
  v = v.substring(0, 11); 
  v = v.replace(/(\d{3})(\d)/, '$1.$2'); 
  v = v.replace(/(\d{3})(\d)/, '$1.$2'); 
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 
  return v;
}

function mascaraTelefone(value) {
  let v = value.replace(/\D/g, '');
  v = v.substring(0, 11); 
  v = v.replace(/^(\d{2})(\d)/g, '($1) $2'); 
  v = v.replace(/(\d{5})(\d)/, '$1-$2'); 
  v = v.replace(/(\d{4})(\d)/, '$1-$2'); 
  return v;
}

function mascaraCEP(value) {
  let v = value.replace(/\D/g, '');
  v = v.substring(0, 8); 
  v = v.replace(/(\d{5})(\d)/, '$1-$2'); 
  return v;
}


/* =================================== */
/* FUNCIONALIDADE 3: VALIDAÇÃO E MODAL */
/* =================================== */
function initModalValidacao() {
    const modalAviso = document.getElementById('modal-aviso');
    const modalMensagem = document.getElementById('modal-mensagem-erro');
    const botaoFecharModal = document.getElementById('modal-botao-fechar');
    const formVoluntario = document.getElementById('form-voluntario'); 

    // Só executa se encontrar o formulário e o modal (provavelmente só na pág cadastro)
    if (formVoluntario && modalAviso) {
        formVoluntario.addEventListener('submit', function(event) {
            if (!formVoluntario.checkValidity()) {
                event.preventDefault(); 
                
                let mensagem = "Por favor, corrija os seguintes erros:<br><ul>";
                formVoluntario.querySelectorAll(':invalid').forEach(campo => {
                    // Tenta encontrar o label associado
                    let label = document.querySelector(`label[for="${campo.id}"]`);
                    // Se não encontrar, tenta pegar o label pai (para radio/checkbox)
                    if (!label && campo.closest('label')) {
                       label = campo.closest('label');
                    }
                    // Pega o texto do legend se for um grupo de radio/checkbox sem label individual
                    let fieldsetText = '';
                    if (!label && campo.closest('fieldset')) {
                       const legend = campo.closest('fieldset').querySelector('legend');
                       if (legend) fieldsetText = legend.textContent;
                    }

                    const fieldName = label ? label.textContent.replace(/[:*]/g, '').trim() : (fieldsetText || campo.name || campo.id);

                    // Melhora a mensagem de erro padrão
                    let errorMsg = '';
                    if (campo.validity.valueMissing) {
                        errorMsg = `O campo '${fieldName}' é obrigatório.`;
                    } else if (campo.validity.patternMismatch) {
                        errorMsg = `O formato do campo '${fieldName}' está inválido. Verifique o exemplo.`;
                    } else if (campo.validity.typeMismatch) {
                         errorMsg = `O tipo de dado para '${fieldName}' está inválido (ex: e-mail).`;
                    } else {
                        errorMsg = `O campo '${fieldName}' está inválido.`;
                    }
                     mensagem += `<li>${errorMsg}</li>`;
                });
                mensagem += "</ul>";
                
                if (modalMensagem) {
                    modalMensagem.innerHTML = mensagem;
                    modalAviso.classList.add('active');
                }
            }
        });
    }

    if (modalAviso && botaoFecharModal) {
        botaoFecharModal.addEventListener('click', () => {
            modalAviso.classList.remove('active');
        });
        
        modalAviso.addEventListener('click', (e) => {
            if (e.target === modalAviso) {
                modalAviso.classList.remove('active');
            }
        });
    }
}

/* =================================== */
/* FUNCIONALIDADE 4: TEMPLATES JS      */
/* (Para a página projetos.html)       */
/* =================================== */
function initTemplateProjetos() {
    const containerProjetos = document.getElementById('lista-projetos-container');
    
    // Só executa se encontrar o container (provavelmente só na pág projetos)
    if (containerProjetos) {
        // Mostra uma mensagem de "carregando" enquanto busca os dados
        containerProjetos.innerHTML = '<p>Carregando projetos...</p>'; 
        
        fetch('data/projetos.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na rede: ' + response.statusText);
                }
                return response.json(); 
            })
            .then(projetos => {
                renderizarProjetos(projetos, containerProjetos);
            })
            .catch(error => {
                console.error('Erro ao buscar ou processar projetos.json:', error);
                containerProjetos.innerHTML = `<p style="color: red;">Não foi possível carregar os projetos. Verifique o console (F12) para mais detalhes.</p>`;
            });
    }
}

/* --- Função Auxiliar de Renderização --- */
function renderizarProjetos(listaDeProjetos, container) {
    container.innerHTML = ''; 

    if (!listaDeProjetos || !Array.isArray(listaDeProjetos) || listaDeProjetos.length === 0) {
        console.warn('Nenhum projeto encontrado ou formato de dados inválido.');
        container.innerHTML = '<p>Nenhum projeto encontrado.</p>';
        return; 
    }

    listaDeProjetos.forEach(projeto => {
        // Validação básica dos dados do projeto antes de renderizar
        if (!projeto || !projeto.imagem || !projeto.titulo || !projeto.descricao) {
             console.warn('Item de projeto inválido:', projeto);
             return; // Pula este item inválido
        }

        const htmlDoProjeto = `
          <article class="projeto">
            <img src="${projeto.imagem}" alt="${projeto.alt || 'Imagem do projeto'}" class="img-projeto" />
            <div class="projeto-info">
              ${projeto.badge ? `<span class="badge">${projeto.badge}</span>` : ''}
              <h3 class="titulo-projeto">${projeto.titulo}</h3>
              <p class="descricao-projeto">${projeto.descricao}</p>
              ${projeto.local ? `<p class="local-projeto"><strong>Local:</strong> ${projeto.local}</p>` : ''}
            </div>
          </article>
        `;
        // Adiciona usando insertAdjacentHTML que é geralmente mais performático
        container.insertAdjacentHTML('beforeend', htmlDoProjeto); 
    });
}


/* =================================== */
/* FUNCIONALIDADE 5: SPA BÁSICO        */
/* =================================== */
function initSPA() {
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('nav a[data-page]'); // Links internos do SPA

    if (!mainContent) {
        console.error("Elemento principal #main-content não encontrado para SPA.");
        return;
    }

    // Função para marcar link ativo
    function setActiveLink(pageName) {
        navLinks.forEach(el => {
            if (el.getAttribute('data-page') === pageName) {
                el.classList.add('active'); // Adiciona classe 'active' ao link atual
            } else {
                el.classList.remove('active'); // Remove de outros
            }
        });
    }

    // Adiciona listener aos links
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); 
            const pageName = link.getAttribute('data-page');
            const filePath = `${pageName}.html`; 

            // Não recarrega se já estiver na página
            const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
            if (pageName === currentPage) return; 

            setActiveLink(pageName);
            loadPageContent(filePath, mainContent, pageName);
        });
    });

    // Lida com botões Voltar/Avançar
    window.addEventListener('popstate', (event) => {
        // event.state pode conter dados que passamos no pushState, se necessário
        const path = window.location.pathname;
        const pageName = path === '/' ? 'index' : path.split('/').pop().replace('.html', '');
        const filePath = path === '/' ? 'index.html' : path.substring(1); 

        // Lista de páginas válidas
        const validPages = ['index', 'sobre', 'projetos', 'cadastro'];
        if (validPages.includes(pageName)) {
             setActiveLink(pageName);
             loadPageContent(filePath, mainContent, pageName, false); // false para não adicionar ao history de novo
        } else {
             console.warn(`Tentativa de navegar para página inválida via popstate: ${path}`);
             // Opcional: redirecionar para index ou mostrar erro 404
             setActiveLink('index');
             loadPageContent('index.html', mainContent, 'index', false);
        }
    });

     // Define o link ativo inicial baseado na URL atual
     const initialPageName = window.location.pathname === '/' ? 'index' : window.location.pathname.split('/').pop().replace('.html', '');
     setActiveLink(initialPageName);
}

// Função para buscar e carregar o conteúdo da página
async function loadPageContent(filePath, mainElement, pageName, addToHistory = true) {
    // Adiciona uma classe para indicar carregamento (opcional, para CSS)
    mainElement.classList.add('loading'); 
    try {
        const response = await fetch(filePath); 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const htmlText = await response.text(); 
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        const newMainContent = doc.querySelector('#main-content');
        const newTitle = doc.querySelector('title'); 

        if (newMainContent) {
            mainElement.innerHTML = newMainContent.innerHTML;
            if (newTitle) {
                document.title = newTitle.textContent;
            }

            // Atualiza a URL apenas se addToHistory for true
            if (addToHistory) {
                 const url = filePath === 'index.html' ? '/' : `/${filePath}`;
                 history.pushState({ page: pageName }, '', url); 
            }

            // Re-inicializa scripts específicos da página carregada
            if (pageName === 'cadastro') {
                initFormularioMascaras(); 
                initModalValidacao();   
            }
            if (pageName === 'projetos') {
                initTemplateProjetos();
            }

            // Fecha o menu mobile se estiver aberto
            const botaoHamburger = document.querySelector('.menu-hamburger');
            const navMobile = document.querySelector('.navegacao-mobile');
            if (botaoHamburger && navMobile && botaoHamburger.classList.contains('active')) {
               botaoHamburger.classList.remove('active');
               navMobile.classList.remove('active');
            }
            
             // Rola a página para o topo
             window.scrollTo({ top: 0, behavior: 'smooth' }); // Rolagem suave

        } else {
            throw new Error(`#main-content não encontrado em ${filePath}`);
        }

    } catch (error) {
        console.error(`Falha ao carregar ${filePath}:`, error);
        mainElement.innerHTML = `<p style="color: red; text-align: center;">Erro ao carregar o conteúdo da página.</p>`;
    } finally {
         // Remove a classe de carregamento
         mainElement.classList.remove('loading');
    }
}