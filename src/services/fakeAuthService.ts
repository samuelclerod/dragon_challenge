import { Md5 } from "ts-md5";
import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  name: string;
  username: string;
  password: string;
}

interface UserSignInDTO {
  username: string;
  password: string
}
interface UserSignUpDTO {
  name: string;
  username: string;
  password: string
}
interface UserSignInResponse {
  user: {
    id: string;
    name: string;
    username: string
  }
  token: string
}
interface UserSignUpResponse {
  user: {
    id: string;
    name: string;
    username: string;
  }
}

export class FakeAuthServices {

  static TIME_TO_WAIT = 100;

  static delay(cb: any, time: number = this.TIME_TO_WAIT) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(cb());
      }, time)
    );
  };

  static async signIn({ username, password: pass }: UserSignInDTO): Promise<UserSignInResponse> {
    const hashedPassword = Md5.hashStr(pass).toString();
    const users: User[] = await this.getUsers();
    const user = users.find(u => u.username === username.trim());
    if (!user || user.password !== hashedPassword)
      throw new Error("Crendenciais incorretas");
    return {
      user,
      token: Md5.hashStr(hashedPassword + user.id + user.username).toString(),
    }
  }

  static async signUp({ name, username, password }: UserSignUpDTO): Promise<UserSignUpResponse> {
    const newUser: Omit<User, 'password'> = await this.addUser({ name, username, password })
    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
      }
    };
  }

  static async getUsers(): Promise<User[]> {
    const users = await this.delay(() => {
      const usersString = localStorage.getItem('@dragon:users');
      if (usersString) {
        return JSON.parse(usersString);
      }
      return [];
    })
    return users as User[];
  }

  static async addUser({ name, password, username }: Omit<User, 'id'>): Promise<Omit<User, 'password'>> {
    const usernameWithoutSpaces = username.trim();
    const users = await this.getUsers();
    const user = users.find(user => user.username === usernameWithoutSpaces);
    if (user) throw new Error('Usuário já existe.')
    const newUser: User = {
      id: uuidv4(),
      name,
      username: usernameWithoutSpaces,
      password: Md5.hashStr(password).toString()
    }
    users.push(newUser)
    localStorage.setItem('@dragon:users', JSON.stringify(users))
    return newUser;
  }
}