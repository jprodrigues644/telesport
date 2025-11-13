# Analyse et Refactorisation - Projet TéléSport

---

## **1. Problèmes Identifiés dans le Starter Code**

### **1.1. Mauvaises Pratiques Angular**

| Type de Problème          | Description                                                                                     | Exemple (Fichier/Ligne)                     |
|----------------------------|-------------------------------------------------------------------------------------------------|--------------------------------------------|
| **Appels HTTP dans les composants** | Les appels API sont effectués directement dans les composants au lieu d'être centralisés dans un service. | `country-details.component.ts` |
| **Absence de typage strict** | Utilisation de `any` au lieu de types spécifiques.                                              | `home.component.ts` (lignes 10-12)          |
| **Code dupliqué**          | La logique de calcul des totaux est dupliquée dans plusieurs composants.                     | `country.component.ts`  |
| **Fichiers trop volumineux** | Certains fichiers contiennent trop de responsabilités (affichage + logique métier).          | `dashboard.component.ts`                  |
| **Code obsolète**          | Présence de `console.log` inutiles et de code commenté.                                         | `country.component.ts`  |
| **Mauvaise gestion des observables** | Les observables ne sont pas correctement gérés (pas de `pipe`, pas de `async`).              | `home.component.ts`         |
| **Mauvaise arborescence des fichiers** | La structure actuelle est peu compréhensible et difficilement maintenable.           | `components/data.service.ts`              |

### **1.2. Risques de Dette Technique**
- **Maintenabilité** : Difficile de maintenir le code à cause de la duplication et du manque de structure.
- **Évolutivité** : Ajouter de nouvelles fonctionnalités sera complexe sans une architecture claire.
- **Tests** : Le code n'est pas facilement testable à cause du mélange des responsabilités.

---

## **2. Nouvelle Architecture Proposée**

### **2.1. Arborescence Cible**

![Arborescence Projet TéléSport](src/assets/images/notesDiag.png)

### **2.2. Rôles et Responsabilités**

| Dossier               | Rôle                                                                                     | Exemple de Contenu                          |
|-----------------------|------------------------------------------------------------------------------------------|---------------------------------------------|
| `components/ui/charts/` | Composants réutilisables pour les graphiques.                                            | `OlympicMedalsPieChartComponent`            |
| `components/layout/`  | Composants de mise en page.
