/**
 * CONFIGURATION DU PRELANDER
 */
const CONFIG = {
    LOGO_URL: "https://cdn-production-opera-website.operacdn.com/staticfiles/assets/images/logo/gx/opera-gx__logo--white.160608602ec9.svg",
    HERO_IMAGE_URL: "https://image.gamrkit.com/image%20opera/1/opera-gx-prelander.png",
    CTA_URL: "https://osyvia.com/ogx/9943/",
    CTA_TEXT: "Télécharger Opera GX",
    BRAND_NAME: "Opera GX",
    VARIANT: "A"
};

const CONTENT = {
    // Le \n force les deux lignes, \u00A0 est l'espace insécable pour le point d'interrogation
    TITLE: "Votre IP est-elle vraiment\nprotégée en jeu\u00A0?",
    SUBTITLE: "Voici comment vous protéger gratuitement.",
    DESCRIPTION: "Un VPN payant pour le gaming ? Opera GX te l’offre gratuitement, VPN illimité, limiteur CPU et RAM intégrés, sans abonnement.",
    BENEFITS: ["VPN Illimité", "Limiteur CPU", "Twitch Intégré"],
    MENTION: "100% gratuit • Aucune carte bancaire requise",
    CREDIBILITY: "Plus de 25 millions de gamers utilisent Opera GX.",
    DISCLAIMER: "Téléchargement gratuit. Des frais de données opérateur peuvent s'appliquer. Opera GX protège votre vie privée."
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Injection des visuels
    document.getElementById('logo').src = CONFIG.LOGO_URL;
    document.getElementById('footer-logo').src = CONFIG.LOGO_URL;
    document.getElementById('hero-img').src = CONFIG.HERO_IMAGE_URL;

    // 2. Injection des textes
    document.getElementById('hero-title').innerText = CONTENT.TITLE;
    document.getElementById('hero-subtitle').innerText = CONTENT.SUBTITLE;
    document.getElementById('description').innerText = CONTENT.DESCRIPTION;
    document.getElementById('mention').innerText = CONTENT.MENTION;
    document.getElementById('credibility').innerText = CONTENT.CREDIBILITY;
    document.getElementById('disclaimer').innerText = CONTENT.DISCLAIMER;
    document.getElementById('copyright').innerText = `© ${new Date().getFullYear()} OPERA SOFTWARE • BUILT FOR CHAMPIONS`;

    // 3. Injection des bénéfices
    const grid = document.getElementById('benefits-grid');
    CONTENT.BENEFITS.forEach(txt => {
        const div = document.createElement('div');
        div.className = 'benefit-item';
        div.innerHTML = `<div class="benefit-icon">✓</div><span class="benefit-text">${txt}</span>`;
        grid.appendChild(div);
    });

    // 4. Gestion de l'URL du CTA (Tracking Persistant)
    const currentParams = new URLSearchParams(window.location.search);
    let finalUrl = CONFIG.CTA_URL;
    try {
        const urlObj = new URL(CONFIG.CTA_URL);
        currentParams.forEach((v, k) => urlObj.searchParams.set(k, v));
        finalUrl = urlObj.toString();
    } catch(e) {}

    // 5. Setup des Boutons et Analytics
    const ctas = [
        { id: 'header-cta', text: CONFIG.CTA_TEXT.split(' ')[0] },
        { id: 'main-cta', text: CONFIG.CTA_TEXT },
        { id: 'footer-cta', text: 'Activer' }
    ];

    ctas.forEach(cta => {
        const el = document.getElementById(cta.id);
        el.innerText = cta.text;
        el.href = finalUrl;
        el.addEventListener('click', (e) => {
            e.preventDefault();

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "prelander_click",
                click_id: currentParams.get('clickid') || 'none',
                location: cta.id,
                variant: CONFIG.VARIANT
            });

            if (typeof fbq === 'function') {
                fbq('trackCustom', 'Go2Offer', {
                    offer: 'opera-gx',
                    placement: cta.id,
                    page: window.location.pathname
                });
            }

            setTimeout(() => {
                window.location.href = finalUrl;
            }, 180);
        });
    });

    // 6. Scroll Intent (35%)
    window.addEventListener('scroll', () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        if ((window.scrollY / total) * 100 > 35) {
            document.getElementById('sticky-footer').classList.add('visible');
        } else {
            document.getElementById('sticky-footer').classList.remove('visible');
        }
    }, { passive: true });
});