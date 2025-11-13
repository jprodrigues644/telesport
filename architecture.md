# Architecture Front-End - Projet TéléSport

Ce document décrit la nouvelle architecture front-end du projet TéléSport.  
Il est conçu pour qu'un nouveau développeur puisse rapidement comprendre la structure et les responsabilités des composants.

---

## **1. Arborescence des Dossiers**

![Arborescence du projet](\telesport\src\assets\images\diag.png)

## 2. Composants et leurs Rôles

| Composant / Dossier | Rôle / Description |
|--------------------|------------------|
| components/layout/header/ | Affiche le header global de l’application. |
| components/layout/footer/ | Affiche le footer global. |
| components/ui/charts/country-medals-bar-chart/ | Composant pour afficher les médailles par pays. |
| components/ui/charts/olympic-medals-pie-chart/ | Composant pour afficher le total des médailles sous forme de graphique. |
| pages/home/ | Page d’accueil de l’application. |
| pages/country-details/ | Page affichant les détails des médailles par pays. |
| pages/not-found/ | Page pour gérer les routes inexistantes. |

---

## 3. Service Angular

| Service | Rôle |
|---------|------|
| services/data.service.ts | Centralise tous les appels API, fournit les données aux composants et gère les observables. |

## 4. Avantages 

- Séparation claire des responsabilités (composants vs logique métier)  
- Préparation à une future connexion back-end/API  
- Facilite le test unitaire et l’extensibilité
