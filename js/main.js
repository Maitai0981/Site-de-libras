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

    showPage('conteudo-principal');
});
