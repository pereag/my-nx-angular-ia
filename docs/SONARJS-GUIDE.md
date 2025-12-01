# Guide SonarJS - Qualité de Code

## 🚀 Scripts Disponibles

### Linter le Projet

```bash
# Linter l'app mini-crm
npm run lint

# Linter avec correction automatique
npm run lint:fix

# Linter tous les projets du monorepo
npm run lint:all

# Linter seulement les fichiers modifiés (affected)
npm run lint:affected
```

---

## 📋 Règles SonarJS Configurées

### ❌ Règles Critiques (Erreurs - Bloquent le Build)

#### 1. **no-all-duplicated-branches**

Détecte les branches identiques dans if/else.

```typescript
// ❌ INTERDIT
if (condition) {
  doSomething();
} else {
  doSomething(); // Code dupliqué !
}

// ✅ BON
doSomething(); // Pas besoin de if/else
```

---

#### 2. **no-element-overwrite**

Détecte l'écrasement d'éléments de tableau.

```typescript
// ❌ INTERDIT
const items = [];
items[0] = 'a';
items[0] = 'b'; // Écrase la valeur précédente !

// ✅ BON
const items = [];
items[0] = 'a';
items[1] = 'b';
```

---

#### 3. **no-identical-conditions**

Détecte les conditions identiques.

```typescript
// ❌ INTERDIT
if (x === 10) {
  // ...
} else if (x === 10) {
  // Condition identique !
  // ...
}

// ✅ BON
if (x === 10) {
  // ...
} else if (x === 20) {
  // ...
}
```

---

#### 4. **no-one-iteration-loop**

Détecte les boucles avec une seule itération.

```typescript
// ❌ INTERDIT
for (let i = 0; i < 10; i++) {
  doSomething();
  break; // Sort immédiatement !
}

// ✅ BON
doSomething(); // Pas besoin de boucle
```

---

### ⚠️ Règles Importantes (Warnings - À Corriger)

#### 5. **cognitive-complexity** (Max 15)

Limite la complexité cognitive d'une fonction.

```typescript
// ❌ TROP COMPLEXE (> 15)
function processOrder(order: Order) {
  if (order.status === 'pending') {
    if (order.amount > 100) {
      if (order.user.isPremium) {
        if (order.delivery === 'express') {
          // Trop d'imbrications !
        }
      }
    }
  }
}

// ✅ BON : Early returns
function processOrder(order: Order) {
  if (order.status !== 'pending') return;
  if (order.amount <= 100) return;
  if (!order.user.isPremium) return;
  if (order.delivery !== 'express') return;
  // Logique principale
}
```

---

#### 6. **no-collapsible-if**

Détecte les if imbriqués qui peuvent être combinés.

```typescript
// ❌ À AMÉLIORER
if (user) {
  if (user.isAdmin) {
    doAdminStuff();
  }
}

// ✅ BON
if (user && user.isAdmin) {
  doAdminStuff();
}
```

---

#### 7. **no-duplicate-string** (Min 5 occurrences)

Détecte les chaînes de caractères dupliquées.

```typescript
// ❌ À AMÉLIORER
console.log('User not found');
throw new Error('User not found');
alert('User not found');
logError('User not found');
showMessage('User not found');

// ✅ BON
const USER_NOT_FOUND = 'User not found';
console.log(USER_NOT_FOUND);
throw new Error(USER_NOT_FOUND);
// ...
```

---

#### 8. **no-identical-functions**

Détecte les fonctions identiques (duplication de code).

```typescript
// ❌ À AMÉLIORER
function calculateUserDiscount(user: User) {
  return user.age > 65 ? user.price * 0.8 : user.price;
}

function calculateAdminDiscount(admin: Admin) {
  return admin.age > 65 ? admin.price * 0.8 : admin.price;
}

// ✅ BON
function calculateDiscount(person: { age: number; price: number }) {
  return person.age > 65 ? person.price * 0.8 : person.price;
}
```

---

#### 9. **prefer-immediate-return**

Préfère un return immédiat plutôt qu'une variable temporaire.

```typescript
// ❌ À AMÉLIORER
function isAdult(age: number): boolean {
  const result = age >= 18;
  return result;
}

// ✅ BON
function isAdult(age: number): boolean {
  return age >= 18;
}
```

---

#### 10. **no-small-switch**

Détecte les switch avec trop peu de cases.

```typescript
// ❌ À AMÉLIORER
switch (status) {
  case 'active':
    return 'Active';
  case 'inactive':
    return 'Inactive';
}

// ✅ BON
const statusLabels = {
  active: 'Active',
  inactive: 'Inactive',
};
return statusLabels[status];
```

---

## 🔧 Correction Automatique

La plupart des erreurs SonarJS peuvent être corrigées automatiquement :

```bash
# Corriger automatiquement
npm run lint:fix
```

Sinon, suivez les suggestions de l'éditeur (Cmd/Ctrl + .).

---

## 🎯 Workflow Recommandé

### Pendant le Développement

```
1. Développer votre code
   ↓
2. ESLint souligne les problèmes en temps réel
   ↓
3. Corriger au fur et à mesure (Cmd/Ctrl + .)
```

### Avant de Commit

```bash
# Vérifier qu'il n'y a pas d'erreurs
npm run lint:affected

# Si erreurs → corriger automatiquement
npm run lint:fix

# Recommit
```

### En CI/CD

```bash
# Dans le pipeline
npm run lint:all

# Si erreurs → Build échoue
```

---

## 💡 Conseils pour Débutants

### 1. Comprendre les Erreurs

Chaque erreur SonarJS a une **explication** :

- Lisez le message d'erreur
- Comprenez pourquoi c'est un problème
- Apprenez le bon pattern

### 2. Ne Pas Désactiver les Règles

Si une règle vous semble trop stricte :

1. Comprenez d'abord pourquoi elle existe
2. Essayez de refactorer votre code
3. Seulement en dernier recours, désactivez-la

### 3. Utiliser les Fix Automatiques

```typescript
// Exemple : no-collapsible-if
if (user) {
  if (user.isAdmin) {
    // ⚠️ Souligné en jaune
    // ...
  }
}

// 1. Placer le curseur sur la ligne
// 2. Cmd/Ctrl + .
// 3. Choisir "Merge nested if"
// 4. ✅ Corrigé automatiquement !
```

---

## 🐛 Problèmes Courants

### "Too many nested callbacks"

**Solution** : Utiliser async/await au lieu de callbacks imbriqués

```typescript
// ❌ Trop imbriqué
getData((data) => {
  processData(data, (result) => {
    saveResult(result, (saved) => {
      // ...
    });
  });
});

// ✅ BON
const data = await getData();
const result = await processData(data);
const saved = await saveResult(result);
```

---

### "Cognitive Complexity is too high"

**Solution** : Découper en fonctions plus petites

```typescript
// ❌ Fonction trop complexe
function processOrder(order: Order) {
  if (order.status === 'pending') {
    if (order.amount > 100) {
      if (order.user.isPremium) {
        // ... 50 lignes de code
      }
    }
  }
}

// ✅ BON : Découper
function processOrder(order: Order) {
  if (!canProcessOrder(order)) return;
  applyPremiumDiscount(order);
  finalizeOrder(order);
}

function canProcessOrder(order: Order): boolean {
  return order.status === 'pending' && order.amount > 100 && order.user.isPremium;
}
```

---

## 📚 Ressources

- [SonarJS Rules](https://github.com/SonarSource/eslint-plugin-sonarjs)
- [Cognitive Complexity Whitepaper](https://www.sonarsource.com/resources/cognitive-complexity/)
- [Clean Code by Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)

---

## 🎓 Pour les Stagiaires

SonarJS vous apprend à :

1. ✅ Écrire du code maintenable
2. ✅ Éviter les bugs classiques
3. ✅ Réduire la complexité
4. ✅ Éliminer la duplication
5. ✅ Appliquer les standards de l'industrie

**Chaque warning est une opportunité d'apprendre !** 🚀

---

**Configuration complète disponible dans `eslint.config.mjs`**
