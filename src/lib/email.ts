import emailjs from '@emailjs/browser';

interface EmailParams {
  to: string;
  subject: string;
  html?: string;
  templateParams?: Record<string, string>;
}

// EmailJS configuration - replace these with your actual values
const EMAILJS_SERVICE_ID = 'noreplay.mnms@gmail.com';
const EMAILJS_TEMPLATE_ID = 'template_fq37mjs';
const EMAILJS_PUBLIC_KEY = 'Exovy28_FcFr_y9DZ'; // Your public key

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function attemptSendEmail(params: EmailParams, attempt: number = 1): Promise<void> {
  try {
    // Log for debug
    console.log(`Tentativa ${attempt} de envio para ${params.to}`);

    // Initialize EmailJS if not already initialized
    if (!window.emailjs) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    // Extract name from email for better personalization if not provided
    const name = params.to.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ');
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

    // Prepare template parameters for EmailJS
    const templateParams = params.templateParams || {
      to_email: params.to,
      to_name: formattedName,
      subject: params.subject,
      message_html: params.html || '',
    };

    // Ensure to_email is always set
    if (!templateParams.to_email) {
      templateParams.to_email = params.to;
    }

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    if (response.status !== 200) {
      throw new Error(`EmailJS returned status code ${response.status}`);
    }

    // Log success
    console.log(`Email enviado com sucesso para ${params.to} (Status: ${response.status}, Text: ${response.text})`);
  } catch (error) {
    console.error(`Tentativa ${attempt} - Detalhes do erro EmailJS:`, error);
    
    if (attempt <= 3) {
      const backoffTime = Math.min(1000 * Math.pow(2, attempt - 1), 8000);
      await delay(backoffTime);
      return attemptSendEmail(params, attempt + 1);
    }
    
    throw error;
  }
}

export async function sendEmail(params: EmailParams): Promise<void> {
  try {
    // Validação de email mais rigorosa
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(params.to)) {
      throw new Error(`Formato de email inválido: ${params.to}`);
    }

    // Log inicial
    console.log(`Iniciando envio de email para ${params.to}`);

    await attemptSendEmail(params);
  } catch (error) {
    console.error('Detalhes do erro de envio:', error);
    
    if (error instanceof Error) {
      throw new Error(`Falha ao enviar email: ${error.message}`);
    }
    
    throw new Error('Ocorreu um erro inesperado ao enviar o email. Por favor, tente novamente.');
  }
}