import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/adminAuth';
import { CreatePostForm } from '@/components/CreatePostForm';

export const metadata: Metadata = {
  title: 'Criar Novo Post | Blog Vamo Sortear',
  description: 'Área administrativa para publicação de artigos.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function NovoPostPage() {
  const isAuth = await isAdminAuthenticated();

  if (!isAuth) {
    redirect('/admin/login');
  }

  return <CreatePostForm />;
}