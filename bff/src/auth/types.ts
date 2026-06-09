import { Observable } from 'rxjs';

export interface AuthServiceClient {
  Login(data: {
    email: string;
    password: string;
  }): Observable<{ jwt_token: string; refresh_token: string }>;
  Register(data: {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
  }): Observable<{ user_id: string }>;
  ValidateToken(data: { jwtToken: string }): Observable<{
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    valid: boolean;
  }>;
}
