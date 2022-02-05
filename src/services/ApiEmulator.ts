import { singleton } from 'tsyringe';
import { AuthService } from './AuthService';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

@singleton()
export class ApiEmulator {
  constructor(private authService: AuthService) {}

  signUp = async ({ login, password }: { login: string, password: string }): Promise<{ success: boolean }> => {
    sessionStorage.setItem('user-data', JSON.stringify({ email: login, password }));
    await sleep(2_000);
    this.authService.isAuthed = true;
    return { success: true };
  };
}
