import { EvaluationFormData } from '../types';

export const PRIMARY_WHATSAPP_NUMBER = '56930395842';

/**
 * Generates a formatted WhatsApp direct link for requesting an evaluation.
 */
export function getWhatsAppEvaluationUrl({ name, phone, symptomOrReason }: EvaluationFormData): string {
  const cleanName = name.trim();
  const cleanPhone = phone.trim();
  const cleanDetail = symptomOrReason?.trim() || 'No especificado';

  const message = [
    'Hola Acupuntura Chile, me gustaría solicitar mi evaluación:',
    '',
    `👤 *Nombre:* ${cleanName}`,
    `📞 *Teléfono:* ${cleanPhone}`,
    `📝 *Motivo / Síntoma:* ${cleanDetail}`
  ].join('\n');

  return `https://wa.me/${PRIMARY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a simple contact WhatsApp link with a predefined subject.
 */
export function getWhatsAppContactUrl(customMessage: string = 'Hola Acupuntura Chile, me gustaría solicitar información.'): string {
  return `https://wa.me/${PRIMARY_WHATSAPP_NUMBER}?text=${encodeURIComponent(customMessage)}`;
}
