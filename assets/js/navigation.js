// Navigation component - Chai Saint Jean
// Ce fichier génère la navigation pour toutes les pages

function createNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    const navigationHTML = `
        <header class="header">
            <nav class="nav container">
                <a href="index.html" class="logo">Chai Saint Jean</a>
                
                <ul class="nav-menu">
                    <li><a href="index.html" class="nav-link ${currentPage === 'index.html' ? 'active' : ''}">Accueil</a></li>
                    <li><a href="presentation.html" class="nav-link ${currentPage === 'presentation.html' ? 'active' : ''}">Présentation</a></li>
                    <li><a href="loft.html" class="nav-link ${currentPage === 'loft.html' ? 'active' : ''}">Loft</a></li>
                    <li><a href="chalet.html" class="nav-link ${currentPage === 'chalet.html' ? 'active' : ''}">F2 Coquelicot</a></li>
                    <li><a href="studio.html" class="nav-link ${currentPage === 'studio.html' ? 'active' : ''}">F2 Camélia</a></li>
                    <li><a href="contact.html" class="nav-link ${currentPage === 'contact.html' ? 'active' : ''}">Contactez-nous</a></li>
                    <li><a href="contact.html" class="btn btn-primary">RÉSERVER</a></li>
                </ul>
                
                <div class="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>
        </header>
    `;
    
    return navigationHTML;
}

// Fonction pour injecter la navigation dans la page
function injectNavigation() {
    // Chercher l'élément header existant ou le body pour l'injection
    const existingHeader = document.querySelector('header');
    const body = document.body;
    
    if (existingHeader) {
        // Remplacer le header existant
        existingHeader.outerHTML = createNavigation();
    } else {
        // Injecter au début du body
        body.insertAdjacentHTML('afterbegin', createNavigation());
    }
}

// Auto-initialisation quand le DOM est chargé, mais après le script principal
document.addEventListener('DOMContentLoaded', function() {
    // Attendre un petit délai pour que le script principal soit chargé
    setTimeout(() => {
        injectNavigation();
        
        // Réinitialiser la navigation avec le script principal si initializeNavigation existe
        if (typeof initializeNavigation === 'function') {
            initializeNavigation();
        }
    }, 100);
});
