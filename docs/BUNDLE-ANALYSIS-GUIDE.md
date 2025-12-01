# Guide d'Analyse du Bundle

## 🎯 Objectif

Ce guide explique comment analyser la taille du bundle de l'application pour identifier les optimisations possibles et réduire l'empreinte carbone.

---

## 📦 Scripts Disponibles

### 1. `npm run analyze`

**Build + Analyse complète**

```bash
npm run analyze
```

**Ce qui se passe** :
1. ✅ Build de production avec source maps
2. ✅ Analyse de tous les fichiers JavaScript
3. ✅ Génère `dist/bundle-report.html`

**Durée** : ~15-30 secondes (selon la taille du projet)

**Quand l'utiliser** : 
- Avant de commiter une nouvelle feature
- Après avoir ajouté une dépendance
- Pour identifier les optimisations possibles

---

### 2. `npm run analyze:serve`

**Analyse + Ouverture automatique dans le navigateur**

```bash
npm run analyze:serve
```

**Ce qui se passe** :
1. ✅ Exécute `npm run analyze`
2. ✅ Lance un serveur HTTP sur le port 8081
3. ✅ Ouvre `bundle-report.html` dans le navigateur

**Quand l'utiliser** : 
- Quand vous voulez voir le rapport immédiatement

---

### 3. `npm run analyze:quick`

**Analyse rapide (sans rebuild)**

```bash
npm run analyze:quick
```

**Ce qui se passe** :
1. ⏭️ Utilise le build existant dans `dist/`
2. ✅ Analyse les fichiers JavaScript
3. ✅ Ouvre le rapport dans le navigateur

**Quand l'utiliser** : 
- Quand vous venez de build et voulez juste voir le rapport
- Pour gagner du temps (pas de rebuild)

**⚠️ Attention** : Nécessite un build récent dans `dist/`

---

### 4. `npm run analyze:json`

**Génère un rapport JSON (pour scripts/CI)**

```bash
npm run analyze:json
```

**Ce qui se passe** :
1. ✅ Build de production avec source maps
2. ✅ Génère `dist/bundle-report.json`

**Quand l'utiliser** : 
- Pour comparer deux versions
- Pour intégration CI/CD
- Pour scripts d'analyse automatisés

---

## 📊 Lire le Rapport

### Structure du Rapport HTML

Le rapport `bundle-report.html` affiche un **treemap interactif** :

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌──────────────┐  ┌──────┐  ┌─────────┐                  │
│  │   @angular   │  │ rxjs │  │ Zone.js │                  │
│  │   (120 KB)   │  │ 30KB │  │  20 KB  │                  │
│  └──────────────┘  └──────┘  └─────────┘                  │
│                                                             │
│  ┌─────────┐  ┌────────┐  ┌──────┐                        │
│  │ App     │  │ Libs   │  │ Other│                        │
│  │ (15 KB) │  │ (10KB) │  │ 1KB  │                        │
│  └─────────┘  └────────┘  └──────┘                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Interprétation

| Couleur | Taille | Action |
|---------|--------|--------|
| 🟢 Vert | < 20 KB | ✅ OK |
| 🟡 Jaune | 20-50 KB | ⚠️ Surveiller |
| 🟠 Orange | 50-100 KB | ⚠️ Optimiser si possible |
| 🔴 Rouge | > 100 KB | ❌ **ACTION REQUISE** |

### Éléments à Surveiller

1. **Dépendances lourdes**
   - lodash, moment, jquery, etc.
   - Chercher des alternatives légères

2. **Code dupliqué**
   - Même code dans plusieurs bundles
   - Factoriser dans une lib partagée

3. **Dead code**
   - Code importé mais non utilisé
   - Supprimer les imports inutiles

---

## 🎯 Workflow Recommandé

### Avant de Commiter une Feature

```bash
# 1. Analyser le bundle actuel
npm run analyze:serve

# 2. Noter les tailles principales
# main.js : 196 KB
# polyfills.js : 34 KB

# 3. Développer votre feature
# ...

# 4. Re-analyser
npm run analyze:serve

# 5. Comparer les tailles
# main.js : 210 KB (+14 KB) ← OK si justifié
# main.js : 280 KB (+84 KB) ← ❌ PROBLÈME !

# 6. Si augmentation > 20 KB, identifier la cause
# - Quelle dépendance a été ajoutée ?
# - Peut-on utiliser une alternative plus légère ?
# - Le code est-il vraiment nécessaire ?
```

---

### Comparer Deux Versions

```bash
# 1. Générer le rapport de main
git checkout main
npm run analyze:json
cp dist/bundle-report.json bundle-main.json

# 2. Générer le rapport de votre branche
git checkout feat/ma-feature
npm run analyze:json
cp dist/bundle-report.json bundle-feature.json

# 3. Comparer (avec un outil diff JSON)
# Ou manuellement en ouvrant les deux fichiers
```

---

## 🚨 Seuils d'Alerte

### Tailles Maximales Recommandées

| Bundle | Taille Max (Raw) | Taille Max (Gzip) | Statut Actuel |
|--------|------------------|-------------------|---------------|
| **main.js** | 200 KB | 60 KB | ✅ 196.64 KB |
| **polyfills.js** | 50 KB | 15 KB | ✅ 34.63 KB |
| **Total Initial** | 250 KB | 75 KB | ✅ 231.31 KB |
| **Lazy Chunk** | 50 KB | 15 KB | - |

**Votre Bundle Actuel** : ✅ **EXCELLENT** (231 KB / 250 KB max)

---

## 🔍 Identifier les Optimisations

### 1. Remplacer les Dépendances Lourdes

**Exemple** :

```typescript
// ❌ AVANT (70 KB)
import _ from 'lodash';
const sorted = _.sortBy(items, 'date');

// ✅ APRÈS (0 KB)
const sorted = items.sort((a, b) => a.date - b.date);
```

**Dépendances lourdes courantes** :

| Librairie | Taille | Alternative |
|-----------|--------|-------------|
| `lodash` | 70 KB | Fonctions natives JS |
| `moment` | 230 KB | `date-fns` (imports spécifiques) |
| `jquery` | 90 KB | DOM natif / Angular |
| `rxjs` (complet) | 150 KB | Imports spécifiques |

---

### 2. Lazy Loading des Features

```typescript
// ✅ BON : Feature chargée à la demande
const routes: Routes = [
  {
    path: 'orders',
    loadChildren: () => import('@mini-crm/feature-orders').then(m => m.ORDERS_ROUTES)
  }
];

// ❌ MAUVAIS : Tout dans le bundle initial
import { OrdersComponent } from './orders/orders.component';
const routes: Routes = [
  { path: 'orders', component: OrdersComponent }
];
```

---

### 3. Imports Spécifiques

```typescript
// ✅ BON : Import spécifique (tree-shakeable)
import { map, filter } from 'rxjs/operators';

// ❌ MAUVAIS : Import complet
import * as rxjs from 'rxjs';
```

---

## 📈 Suivi dans le Temps

### Créer un Historique

```bash
# Script pour suivre l'évolution
echo "$(date +%Y-%m-%d), $(git rev-parse --short HEAD), $(grep -o '[0-9.]\+ kB' dist/bundle-report.html | head -1)" >> bundle-history.csv
```

**Fichier `bundle-history.csv`** :

```csv
Date,Commit,Size
2024-01-15,abc123,196.64 KB
2024-01-20,def456,201.32 KB
2024-01-25,ghi789,198.45 KB
```

---

## 🤖 Intégration CI/CD (Optionnel)

### Dans `.github/workflows/pr.yml`

```yaml
- name: Analyze bundle size
  run: npm run analyze:json
  continue-on-error: true

- name: Upload bundle report
  uses: actions/upload-artifact@v4
  if: always()
  with:
    name: bundle-report
    path: dist/bundle-report.json
```

---

## 🎓 Pour les Stagiaires

### Checklist Avant Commit

- [ ] `npm run analyze:serve` exécuté
- [ ] Taille du bundle vérifiée (< 250 KB total)
- [ ] Si augmentation > 20 KB, cause identifiée et justifiée
- [ ] Pas d'imports lourds inutiles (lodash, moment, etc.)
- [ ] Lazy loading utilisé pour les features

---

## 📚 Ressources

- [source-map-explorer - GitHub](https://github.com/danvk/source-map-explorer)
- [Angular Performance Guide](https://angular.dev/best-practices/runtime-performance)
- [Web.dev - Optimize Bundle Size](https://web.dev/reduce-javascript-payloads-with-code-splitting/)

---

**Configuration installée le** : $(date)
**Outil** : `source-map-explorer`
**Version** : Voir `package.json`

