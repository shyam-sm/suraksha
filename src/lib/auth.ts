export type UserRole = 'admin' | 'police' | 'tourism' | 'tourist';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  tripId?: string;
  emergencyContacts?: Array<{
    name: string;
    phone: string;
    relationship: string;
  }>;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Mock authentication service
export class AuthService {
  private static readonly STORAGE_KEY = 'tourism_auth';

  static async login(email: string, password: string): Promise<User> {
    // Mock login logic - in real app this would call backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data based on email
    const mockUsers: Record<string, User> = {
      'admin@gov.in': {
        id: '1',
        name: 'John Smith',
        email: 'admin@gov.in',
        role: 'admin',
        department: 'Tourism Department'
      },
      'police@gov.in': {
        id: '2',
        name: 'Officer Sarah Wilson',
        email: 'police@gov.in',
        role: 'police',
        department: 'City Police'
      },
      'tourist@example.com': {
        id: '3',
        name: 'Alex Johnson',
        email: 'tourist@example.com',
        role: 'tourist',
        tripId: 'TRP-2024-001',
        emergencyContacts: [
          { name: 'Jane Johnson', phone: '+1-555-0123', relationship: 'Spouse' },
          { name: 'Emergency Services', phone: '+91-112', relationship: 'Emergency' }
        ]
      }
    };

    const user = mockUsers[email];
    if (!user || password !== 'demo123') {
      throw new Error('Invalid credentials');
    }

    this.setUser(user);
    return user;
  }

  static logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  static getCurrentUser(): User | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  static isAuthority(user: User | null): boolean {
    return user?.role === 'admin' || user?.role === 'police' || user?.role === 'tourism';
  }

  static isTourist(user: User | null): boolean {
    return user?.role === 'tourist';
  }

  private static setUser(user: User): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }
}