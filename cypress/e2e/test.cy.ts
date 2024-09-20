/// <reference types="cypress" />

describe('Form Validation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should not allow submission if jury type is not selected', () => {
    cy.get('input[placeholder="Numéro de jury"]').type('123');
    cy.get('input[placeholder="Prénom NOM"]').type('John Doe');

    // Essaye de soumettre le formulaire sans sélectionner de type de jury
    cy.get('form').submit();

    // Vérifie que le bouton est désactivé
    cy.get('button[type="submit"]').should('be.disabled');
  });
});

describe('Form Submission', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should submit the form and redirect based on jury type', () => {
    cy.get('input[placeholder="Numéro de jury"]').type('123');
    cy.get('input[placeholder="Prénom NOM"]').type('John Doe');

    // Sélectionne le type de jury
    cy.get('input[type="radio"][value="Dégustation"]').check();

    // Soumets le formulaire
    cy.get('form').submit();

    // Vérifie la redirection
    cy.url().should('include', '/listingdegustation');
  });

  it('should submit the form and redirect to the technique listing', () => {
    cy.get('input[placeholder="Numéro de jury"]').type('456');
    cy.get('input[placeholder="Prénom NOM"]').type('Jane Doe');

    // Sélectionne le type de jury
    cy.get('input[type="radio"][value="Technique"]').check();

    // Soumets le formulaire
    cy.get('form').submit();

    // Vérifie la redirection
    cy.url().should('include', '/listingtechnique');
  });
});

describe('Accueil Page Tests', () => {
  beforeEach(() => {
    // Visite la page d'accueil avant chaque test
    cy.visit('/');
  });

  it('should display the logo', () => {
    cy.get('.logo-accueil').should('be.visible');
  });

  it('should display the title', () => {
    cy.get('#title').contains('Inscription des jurys');
  });

  it('should display the instructions', () => {
    cy.get('#instructions').contains('Merci de compléter les informations ci-dessous afin d\'avoir accès à la liste des candidats et aux grilles d\'évaluation');
  });

  it('should display the validation message', () => {
    cy.get('h6').contains('Toute validation est définitive, merci de bien vérifier les informations saisies avant de continuer.');
  });
});
