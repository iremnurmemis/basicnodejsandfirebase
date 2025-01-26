export class User {
    constructor(id, name, email, rentals = []) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.rentals = rentals; 
    }
  }
  