// Sistema de carregamento com monitoramento real de recursos
(function() {
    const progressFill = document.getElementById('progress-fill');
    const loadingPercentage = document.getElementById('loading-percentage');
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.querySelector('.loading-text');

    let totalResources = 0;
    let loadedResources = 0;
    let allResourcesLoaded = false;

    // Atualizar barra de progresso
    function updateProgress(value) {
        progressFill.style.width = value + '%';
        loadingPercentage.textContent = Math.round(value) + '%';
    }

    // Calcular e atualizar progresso baseado em recursos carregados
    function updateResourceProgress() {
        if (totalResources > 0) {
            const progress = (loadedResources / totalResources) * 100;
            updateProgress(progress);

            // Atualizar texto informativo
            loadingText.textContent = `Carregando recursos... ${loadedResources}/${totalResources}`;

            // Se todos os recursos foram carregados
            if (loadedResources >= totalResources && !allResourcesLoaded) {
                allResourcesLoaded = true;
                loadingText.textContent = 'Carregamento concluído!';
                removeLoadingScreen();
            }
        }
    }

    // Remover tela de carregamento
    function removeLoadingScreen() {
        setTimeout(() => {
            loadingScreen.classList.add('hide');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 500);
    }

    // Monitorar carregamento de um recurso
    function monitorResource(element, type) {
        totalResources++;

        const onLoad = () => {
            loadedResources++;
            updateResourceProgress();
        };

        const onError = () => {
            console.warn(`Falha ao carregar ${type}:`, element.src || element.href);
            loadedResources++; // Contar como carregado para não travar
            updateResourceProgress();
        };

        if (element.complete || element.readyState === 4) {
            // Já está carregado
            loadedResources++;
        } else {
            // Aguardar carregamento
            element.addEventListener('load', onLoad);
            element.addEventListener('loadeddata', onLoad); // Para vídeos
            element.addEventListener('error', onError);
        }
    }

    // Esperar o DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeLoading);
    } else {
        initializeLoading();
    }

    function initializeLoading() {
        // Monitorar todas as imagens
        const images = document.querySelectorAll('img');
        images.forEach(img => monitorResource(img, 'imagem'));

        // Monitorar todos os vídeos
        const videos = document.querySelectorAll('video');
        videos.forEach(video => monitorResource(video, 'vídeo'));

        // Monitorar CSS (stylesheets)
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        stylesheets.forEach(link => monitorResource(link, 'CSS'));

        // Se não houver recursos, completar imediatamente
        if (totalResources === 0) {
            totalResources = 1;
            loadedResources = 1;
        }

        // Atualizar progresso inicial
        updateResourceProgress();

        // Fallback de segurança: forçar remoção após 15 segundos
        setTimeout(() => {
            if (!allResourcesLoaded) {
                console.warn('Timeout de carregamento atingido. Forçando conclusão...');
                loadedResources = totalResources;
                allResourcesLoaded = true;
                updateProgress(100);
                loadingText.textContent = 'Carregamento concluído!';
                removeLoadingScreen();
            }
        }, 15000);
    }

    // Backup: usar window.load também
    window.addEventListener('load', function() {
        if (!allResourcesLoaded) {
            loadedResources = totalResources;
            allResourcesLoaded = true;
            updateProgress(100);
            loadingText.textContent = 'Carregamento concluído!';
            removeLoadingScreen();
        }
    });
})();

document.addEventListener('DOMContentLoaded', function () {
    const allPages = document.querySelectorAll('.page-content');

    function showPage(pageId) {
        allPages.forEach(page => {
            page.style.display = 'none';
        });
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.style.display = 'block';
            window.scrollTo(0, 0);
        }
    }

    document.body.addEventListener('click', function(event) {
        let target = event.target;

        const linkSecao = target.closest('.link-secao');
        const btnVoltar = target.closest('.btn-voltar-menu');
        const btnFeedback = target.closest('#btn-abrir-feedback');

        if (linkSecao) {
            const pageId = linkSecao.getAttribute('data-target');
            showPage(pageId);
        } else if (btnVoltar) {
            showPage('conteudo-principal');
        } else if (btnFeedback) {
            event.preventDefault();
            showPage('secao-feedback');
        }
    });

    // Animação estilo GIF para os cards
    function initCardAnimations() {
        const cardGrids = document.querySelectorAll('.card-images-grid:not(.single)');

        cardGrids.forEach(grid => {
            const images = grid.querySelectorAll('img');
            if (images.length <= 1) return;

            let currentIndex = 0;
            images[0].classList.add('active');

            setInterval(() => {
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
            }, 800); // Troca a cada 800ms (0.8 segundos)
        });
    }

    showPage('conteudo-principal');
    initCardAnimations();
});
