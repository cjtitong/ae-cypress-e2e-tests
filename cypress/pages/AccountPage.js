export default class AccountPage {
  getDeleteAccountButton() { 
    return cy.get('a[href="/delete_account"]').contains('Delete Account');
  }

  getAccountDeletedTitle() { 
    return cy.contains('Account Deleted!', { timeout: 10000 });
  }

  getLogoutButton() { 
    return cy.get('a[href="/logout"]').contains('Logout');
  }

  getLoggedInAs(username) { 
    return cy.contains(`Logged in as ${username}`, { timeout: 15000 });
  }

  logout() {
    this.getLogoutButton().click({ force: true });
  }

  deleteAccount() {
    this.getDeleteAccountButton().click({ force: true });
    this.getAccountDeletedTitle().should('be.visible');
  }
}
