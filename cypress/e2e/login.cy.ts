/// <reference types="cypress" />

describe('Page de connexion', () => {
    beforeEach(() => {
      // Accède à la page de connexion
      cy.visit('/');
    });
  
    it('Affiche correctement les éléments de la page', () => {
      // Vérifie la présence du logo
      cy.get('.logo-accueil').should('have.attr', 'src', '/logo.jpg');
      cy.contains('19ème édition').should('be.visible');
      cy.contains('Page de connexion').should('be.visible');
      cy.contains('Merci de compléter les informations ci-dessous').should('be.visible');
      cy.contains('Pas encore de compte? Cliquez ici').should('be.visible');
    });

  
    it('Permet de saisir un email et un mot de passe', () => {
      // Saisir l'email
      cy.get('input[placeholder="E-mail"]').type('test@example.com');
      // Saisir le mot de passe
      cy.get('input[placeholder="Mot de passe"]').type('password123');
    });
  
    it('Empêche la soumission sans sélectionner un type de jury', () => {
      cy.get('ion-button[type="submit"]').should('be.disabled');
    });
  
    it('Redirige après une soumission valide', () => {
      // Saisir l'email
      cy.get('input[placeholder="E-mail"]').type('test@example.com');
      // Saisir le mot de passe
      cy.get('input[placeholder="Mot de passe"]').type('password123');
  
      // Simule la sélection du type de jury (si désactivé, commenter)
      cy.get('ion-radio-group').find('ion-radio[value="Dégustation"]').click();
  
      // Cliquer sur le bouton de validation
      cy.get('ion-button[type="submit"]').click();
  
      // Vérifier la redirection vers la liste des candidats
      cy.url().should('include', '/listingdegustation'); // Remplacez par votre route réelle
    });
  });