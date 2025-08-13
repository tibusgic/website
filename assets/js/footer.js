// Footer component - Chai Saint Jean
// Ce fichier génère le footer pour toutes les pages

function createFooter() {
    const currentYear = new Date().getFullYear();
    
    const footerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>Chai Saint Jean</h3>
                        <p>Hébergements de charme depuis 2015</p>
                        <p>Une expérience unique dans un cadre exceptionnel</p>
                    </div>
                    
                    <div class="footer-section">
                        <h3>Nos Hébergements</h3>
                        <a href="chalet.html">F2 Coquelicot</a>
                        <a href="loft.html">Le Loft</a>
                        <a href="studio.html">F2 Camélia</a>
                        <a href="presentation.html">Présentation</a>
                    </div>
                    
                    <div class="footer-section">
                        <h3>Contact</h3>
                        <p><i class="fas fa-map-marker-alt"></i> Saint-Jean-de-Boiseau<br>44640 Loire-Atlantique</p>
                        <p><i class="fas fa-phone"></i> +33 X XX XX XX XX</p>
                        <p><i class="fas fa-envelope"></i> contact@chaistjean.fr</p>
                    </div>
                    
                    <div class="footer-section">
                        <h3>Suivez-nous</h3>
                        <div style="display: flex; gap: 15px; font-size: 1.5rem;">
                            <a href="https://www.facebook.com/profile.php?id=100013538945513" style="color: var(--primary-beige);" title="Facebook"><i class="fab fa-facebook"></i></a>
                            <a href="https://www.instagram.com/tata.carole.en.cuisine/" style="color: var(--primary-beige);" title="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="#" style="color: var(--primary-beige);" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; ${currentYear} Chai Saint Jean. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    `;
    
    return footerHTML;
}

// Fonction pour injecter le footer dans la page
function injectFooter() {
    // Chercher l'élément footer existant ou le body pour l'injection
    const existingFooter = document.querySelector('footer');
    const body = document.body;
    
    if (existingFooter) {
        // Remplacer le footer existant
        existingFooter.outerHTML = createFooter();
    } else {
        // Injecter à la fin du body, mais avant les scripts
        const scripts = body.querySelectorAll('script');
        if (scripts.length > 0) {
            scripts[0].insertAdjacentHTML('beforebegin', createFooter());
        } else {
            body.insertAdjacentHTML('beforeend', createFooter());
        }
    }
}

// Auto-initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    // Attendre un petit délai pour que les autres scripts soient chargés
    setTimeout(() => {
        injectFooter();
    }, 150);
});
