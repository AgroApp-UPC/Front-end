export class User {
  id: number;
  user_name: string;
  email: string;
  phone_number: string;
  identificator: string;
  password?: string;

  constructor() {
    this.id = 0;
    this.user_name = '';
    this.email = '';
    this.phone_number = '';
    this.identificator = '';
    this.password = '';
  }
}
