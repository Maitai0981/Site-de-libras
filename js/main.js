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
        const card = target.closest('.card');

        if (linkSecao) {
            const pageId = linkSecao.getAttribute('data-target');
            showPage(pageId);
        } else if (card && card.closest('.galeria')) {
            // Quando clicar em um card, abrir a página da categoria
            const galeria = card.closest('.galeria');
            const titulo = galeria.querySelector('.link-secao');
            if (titulo) {
                const pageId = titulo.getAttribute('data-target');
                showPage(pageId);
            }
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
