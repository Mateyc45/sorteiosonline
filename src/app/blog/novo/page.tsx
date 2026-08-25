import { Metadata } from 'next';
import { CreatePostForm } from '@/components/CreatePostForm';

export const metadata: Metadata = {
  title: 'Criar Novo Post | Blog Vamo Sortear',
  description: 'Crie e publique um novo artigo no blog do Vamo Sortear.',
};

export default function NovoPostPage() {
  return <CreatePostForm />;
}