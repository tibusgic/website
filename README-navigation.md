# Navigation Centralisée - Chai Saint Jean

## 🎯 Objectif
Créer une navigation uniforme sur toutes les pages du site avec un seul fichier de configuration.

## 📁 Structure mise en place

### Fichier de navigation
- **`assets/js/navigation.js`** : Contient la configuration centralisée de la navigation

### Pages mises à jour
✅ `index.html`
✅ `chalet.html` 
✅ `loft.html`
✅ `studio.html`
✅ `presentation.html`
✅ `contact.html`
✅ `video-piscine.html`

## 🎛️ Configuration du menu

Le menu généré automatiquement contient :

```
Chai Saint Jean
├── Accueil (index.html)
├── Présentation (presentation.html)
├── Loft (loft.html)
├── F2 Coquelicot (chalet.html)
├── F2 Camélia (studio.html)
├── Contactez-nous (contact.html)
└── [BOUTON] RÉSERVER (contact.html)
```

## ✨ Fonctionnalités

- **Page active automatique** : La page courante est automatiquement mise en surbrillance
- **Mobile responsive** : Menu hamburger fonctionnel
- **Compatible** : S'intègre avec le script.js existant
- **Uniforme** : Même navigation sur toutes les pages

## 🔧 Modification du menu

Pour modifier le menu, éditez uniquement le fichier :
`assets/js/navigation.js`

Les changements s'appliqueront automatiquement à toutes les pages.

## 🚀 Test

1. Ouvrez n'importe quelle page du site
2. Vérifiez que la navigation s'affiche correctement
3. Testez la navigation mobile (cliquez sur le menu hamburger)
4. Vérifiez que la page active est bien mise en surbrillance

## 💡 Avantages

- ✅ **Maintenance facilitée** : Un seul fichier à modifier
- ✅ **Cohérence** : Navigation identique partout
- ✅ **Évolutif** : Facile d'ajouter de nouvelles pages
- ✅ **Performance** : Génération côté client rapide
