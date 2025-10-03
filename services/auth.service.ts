import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // npm install jwt-decode

// Interface voor de gebruiker payload in de JWT
interface User {
  id: string;
  name: string;
}

class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor() {
    // Probeer de gebruiker te laden vanuit localStorage bij het opstarten
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        this.userSubject.next(decoded);
      } catch (error) {
        this.logout();
      }
    }
  }

  public get currentUserValue(): User | null {
    return this.userSubject.value;
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
    const decoded = jwtDecode<User>(token);
    this.userSubject.next(decoded);
  }

  public logout() {
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }
}

export const authService = new AuthService();