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

const delay = async (ms: number = 1000) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const signIn = async ({ username, password }: UserSignInDTO): Promise<UserSignInResponse> => {
  const users: User[] = await getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  console.log(user)
  if (!user) throw new Error("Usuário ou login inválido")
  return {
    user,
    token: Md5.hashAsciiStr(password).toString(),
  };
}

const signUp = async ({ name, username, password }: UserSignUpDTO): Promise<UserSignUpResponse> => {
  const newUser: Omit<User, 'password'> = await addUser({ name, username, password })
  return {
    user: {
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
    }
  };
}

const getUsers = async (): Promise<User[]> => {
  await delay(500);
  const usersString = localStorage.getItem('@dragon:users');
  if (usersString) {
    const users = JSON.parse(usersString);
    return users as User[];
  }
  return [];

}

const addUser = async ({ name, password, username }: Omit<User, 'id'>): Promise<Omit<User, 'password'>> => {
  const usernameWithoutSpaces = username.trim();
  const users = await getUsers();
  const user = users.find(user => user.username === usernameWithoutSpaces);
  if (user) throw new Error('Usuário já existe.')
  const newUser: User = {
    id: uuidv4(),
    name,
    username: usernameWithoutSpaces,
    password
  }
  users.push(newUser)
  localStorage.setItem('@dragon:users', JSON.stringify(users))
  return newUser;
}

export { signIn, signUp }