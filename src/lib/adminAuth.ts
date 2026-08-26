'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE_NAME = 'admin_session';

/**
 * Verifica no servidor se o usuário possui a sessão de administrador válida
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  return session?.value === 'authenticated';
}

/**
 * Realiza a autenticação de admin comparando a senha informada com ADMIN_PASSWORD
 */
export async function loginAdmin(formData: FormData) {
  const password = formData.get('password') as string;
  const adminSecret = process.env.ADMIN_PASSWORD;

  if (!adminSecret || password !== adminSecret) {
    throw new Error('Senha incorreta. Verifique a senha configurada no arquivo .env.');
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 dias de sessão
    path: '/',
  });

  redirect('/blog/novo');
}

/**
 * Encerra a sessão de administrador
 */
export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect('/blog');
}

