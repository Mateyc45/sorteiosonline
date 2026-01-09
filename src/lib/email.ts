import emailjs from '@emailjs/browser';

interface EmailParams {
  to: string;
  subject: string;
  html?: string;
  templateParams?: Record<string, string>;
}

// 1. Configuração via Variáveis de Ambiente (Segurança)
// Se não tiver o .env configurado ainda, ele tenta usar as strings hardcoded como fallback
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_SEU_ID_AQUI'; 
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_fq37mjs';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'Exovy28_FcFr_y9DZ';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function attemptSendEmail(params: EmailParams, attempt: number = 1): Promise<void> {
  try {
    // Log para debug (apenas em desenvolvimento)
    if (process.env.NODE_ENV === 'development') {
      console.log(`Tentativa ${attempt} de envio para ${params.to}`);
    }

    // 2. Extração de nome (Formatação)
    const name = params.to.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ');
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

    // 3. Preparação dos parâmetros do template
    // Garanta que no seu painel do EmailJS o template espera essas variáveis (to_email, to_name, etc)
    const templateParams = {
      to_email: params.to,
      to_name: formattedName,
      subject: params.subject,
      message_html: params.html || '',
      ...params.templateParams, // Mescla com parâmetros extras se houver
    };

    // 4. Envio direto (Next.js não precisa checar window.emailjs com o pacote npm)
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    if (response.status !== 200) {
      throw new Error(`EmailJS retornou status ${response.status}: ${response.text}`);
    }

    console.log(`✅ Email enviado para ${params.to}`);

  } catch (error) {
    console.error(`❌ Erro na tentativa ${attempt}:`, error);
    
    // Lógica de Retentativa (Backoff Exponencial)
    if (attempt < 3) {
      const backoffTime = 1000 * attempt; // Espera 1s, depois 2s...
      console.log(`⏳ Tentando novamente em ${backoffTime}ms...`);
      await delay(backoffTime);
      return attemptSendEmail(params, attempt + 1);
    }
    
    // Se falhar todas as vezes, repassa o erro
    throw error;
  }
}

export async function sendEmail(params: EmailParams): Promise<void> {
  try {
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(params.to)) {
      throw new Error(`Email inválido: ${params.to}`);
    }

    await attemptSendEmail(params);
  } catch (error) {
    // Tratamento de erro final para a UI
    const message = error instanceof Error ? error.message : 'Erro desconhecido no envio';
    console.error('Falha crítica no envio:', message);
    throw new Error(`Não foi possível enviar o email: ${message}`);
  }
}