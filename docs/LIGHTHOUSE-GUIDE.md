# Guide Lighthouse CI - Mini CRM

## 🚀 Scripts Disponibles

### Audit Complet

```bash
# Build + Audit Lighthouse (performance, accessibilité, SEO, bonnes pratiques)
npm run audit
```

**Résultat** : Rapport HTML dans `.lighthouseci/`

---

### Audit Accessibilité Seule

```bash
# Audit uniquement l'accessibilité (WCAG AA)
npm run audit:accessibility
```

---

### Audit Performance Seule

```bash
# Audit uniquement la performance (Core Web Vitals)
npm run audit:performance
```

---

### Rapport Complet (Compodoc + Lighthouse)

```bash
# Génère TOUT : Documentation Compodoc + Audit Lighthouse
npm run report
```

**Résultat** :
- `docs/compodoc/` → Documentation du code
- `.lighthouseci/` → Rapports d'audit

---

### Mode Serveur (Compodoc + Lighthouse en même temps)

```bash
# Lance Compodoc sur :8080 ET Lighthouse en parallèle
npm run report:serve
```

**Résultat** :
- `http://localhost:8080` → Documentation Compodoc
- `.lighthouseci/` → Rapports Lighthouse générés

---

## 📊 Seuils de Qualité Configurés

### Erreurs (Build Fail)

- ❌ **Accessibilité** : Score < 90/100
- ❌ **Contraste de couleurs** : Insuffisant (< 4.5:1)
- ❌ **Labels formulaires** : Manquants
- ❌ **Noms de boutons** : Manquants
- ❌ **Alt images** : Manquants
- ❌ **Noms de liens** : Manquants

### Warnings (Build Continue)

- ⚠️ **Performance** : Score < 80/100
- ⚠️ **SEO** : Score < 90/100
- ⚠️ **Bonnes Pratiques** : Score < 80/100

---

## 📋 Interpréter les Résultats

### Ouvrir le Rapport

```bash
# Après avoir lancé npm run audit
open .lighthouseci/lhr-*.html
```

Ou trouvez les fichiers dans le dossier `.lighthouseci/`

---

### Scores

| Score | Signification | Action |
|-------|---------------|--------|
| 90-100 | ✅ Excellent | Maintenir |
| 50-89 | ⚠️ À améliorer | Optimiser |
| 0-49 | ❌ Critique | Corriger d'urgence |

---

### Métriques Clés

#### Performance

- **FCP** (First Contentful Paint) : < 1.8s ✅
- **LCP** (Largest Contentful Paint) : < 2.5s ✅
- **TBT** (Total Blocking Time) : < 200ms ✅
- **CLS** (Cumulative Layout Shift) : < 0.1 ✅
- **Speed Index** : < 3.4s ✅

#### Accessibilité (WCAG AA)

- **Contraste** : Minimum 4.5:1 pour texte normal
- **Labels** : Tous les inputs doivent avoir un label
- **Alt** : Toutes les images doivent avoir un alt
- **Navigation clavier** : Tous les éléments interactifs accessibles
- **ARIA** : Attributs ARIA corrects

---

## 🔧 Configuration

La configuration est dans `lighthouserc.json` :

```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,  // Moyenne de 3 audits
      "url": ["http://localhost:8080"]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", { "minScore": 0.8 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:seo": ["warn", { "minScore": 0.9 }]
      }
    }
  }
}
```

**Modifier les seuils** : Changez `minScore` (0.0 à 1.0)

---

## 🎯 Workflow Recommandé

### Pendant le Développement

```bash
# Développer
npm start

# Tester
npm test
```

### Avant de Commit

```bash
# Vérifier la qualité complète
npm run report

# Vérifier seulement l'accessibilité
npm run audit:accessibility
```

### En CI/CD

```bash
# Dans GitHub Actions / GitLab CI
npm run audit
```

Si les seuils ne sont pas atteints, le build échoue ❌

---

## 💡 Conseils

### Améliorer la Performance

1. **Optimiser les images** : WebP, lazy loading
2. **Code splitting** : Lazy loading des routes
3. **Minification** : Déjà fait par Angular en prod
4. **CDN** : Servir les assets depuis un CDN

### Améliorer l'Accessibilité

1. **Contrastes** : Utiliser les variables Bootstrap (`--bs-primary`, etc.)
2. **Labels** : Toujours associer `<label for="id">` avec `<input id="id">`
3. **Alt** : Ajouter des alt descriptifs sur toutes les images
4. **Navigation clavier** : Tester avec Tab/Shift+Tab

### Améliorer le SEO

1. **Meta description** : Dans `index.html`
2. **Titre** : Différent pour chaque page (Title Service)
3. **Robots.txt** : Ajouter si besoin
4. **Sitemap** : Générer un sitemap.xml

---

## 🐛 Problèmes Courants

### Erreur : "Port 8080 already in use"

```bash
# Tuer le processus sur le port 8080
npx kill-port 8080

# Relancer
npm run audit
```

### Erreur : "No lhci results found"

```bash
# S'assurer que le build existe
npm run build

# Vérifier que dist/apps/mini-crm/browser existe
ls -la dist/apps/mini-crm/browser
```

### Scores très bas

1. Vérifier que le build est en **mode production** : `npm run build` (pas `build:dev`)
2. Les scores en mode dev sont toujours plus bas

---

## 📚 Ressources

- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Web Vitals](https://web.dev/vitals/)
- [WCAG AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Bootstrap Accessibility](https://getbootstrap.com/docs/5.3/getting-started/accessibility/)

---

**Toutes les commandes sont prêtes ! Lancez `npm run report` pour générer documentation + audit qualité. 🚀**

