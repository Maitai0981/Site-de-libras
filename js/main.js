// Sistema de carregamento com monitoramento real de recursos
(function() {
    const progressFill = document.getElementById('progress-fill');
    const loadingPercentage = document.getElementById('loading-percentage');
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.querySelector('.loading-text');

    let totalResources = 0;
    let loadedResources = 0;
    let allResourcesLoaded = false;
    let totalVideos = 0;
    let loadedVideos = 0;
    let totalImages = 0;
    let loadedImages = 0;

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

            // Atualizar texto informativo detalhado
            if (loadedVideos < totalVideos) {
                loadingText.textContent = `Carregando vídeos... ${loadedVideos}/${totalVideos}`;
            } else if (loadedImages < totalImages) {
                loadingText.textContent = `Carregando imagens... ${loadedImages}/${totalImages}`;
            } else {
                loadingText.textContent = `Carregando... ${loadedResources}/${totalResources}`;
            }

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
        let counted = false;

        const onLoad = () => {
            if (!counted) {
                counted = true;
                loadedResources++;

                // Incrementar contadores específicos
                if (type === 'vídeo') {
                    loadedVideos++;
                } else if (type === 'imagem') {
                    loadedImages++;
                }

                console.log(`✓ ${type} carregado (${loadedResources}/${totalResources}): ${element.src || element.href}`);
                updateResourceProgress();
            }
        };

        const onError = () => {
            if (!counted) {
                counted = true;
                loadedResources++;

                // Incrementar contadores específicos mesmo em erro
                if (type === 'vídeo') {
                    loadedVideos++;
                } else if (type === 'imagem') {
                    loadedImages++;
                }

                console.warn(`✗ Falha ao carregar ${type}:`, element.src || element.href);
                updateResourceProgress();
            }
        };

        // Para vídeos, verificar múltiplos estados de carregamento
        if (type === 'vídeo') {
            if (element.readyState >= 3) {
                // HAVE_FUTURE_DATA ou HAVE_ENOUGH_DATA
                counted = true;
                loadedResources++;
                loadedVideos++;
                console.log(`✓ ${type} já carregado: ${element.src}`);
            } else {
                // Monitorar múltiplos eventos de vídeo
                element.addEventListener('loadeddata', onLoad); // Primeiro quadro carregado
                element.addEventListener('canplay', onLoad); // Pode começar a tocar
                element.addEventListener('canplaythrough', onLoad); // Pode tocar até o fim
                element.addEventListener('error', onError);
            }
        }
        // Para imagens
        else if (element.complete) {
            counted = true;
            loadedResources++;
            loadedImages++;
            console.log(`✓ ${type} já carregada: ${element.src || element.href}`);
        } else {
            element.addEventListener('load', onLoad);
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
        // PRIORIDADE 1: Monitorar e forçar carregamento de todos os vídeos primeiro
        const videos = document.querySelectorAll('video');
        totalVideos = videos.length;
        console.log(`📹 Encontrados ${totalVideos} vídeos para carregar`);

        videos.forEach(video => {
            // Forçar preload dos vídeos
            video.preload = 'auto';
            video.load(); // Forçar início do carregamento
            monitorResource(video, 'vídeo');
        });

        // PRIORIDADE 2: Monitorar todas as imagens
        const images = document.querySelectorAll('img');
        totalImages = images.length;
        console.log(`🖼️ Encontradas ${totalImages} imagens para carregar`);

        images.forEach(img => {
            // Forçar carregamento de imagens mesmo que estejam ocultas
            if (!img.src && img.dataset.src) {
                img.src = img.dataset.src;
            }
            monitorResource(img, 'imagem');
        });

        // PRIORIDADE 3: Monitorar CSS (stylesheets)
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        console.log(`📄 Encontrados ${stylesheets.length} arquivos CSS para carregar`);
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
