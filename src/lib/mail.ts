import ResetPassword from '@/emails/reset-email'
import LinkEmail from '@/emails/verify-email'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Send a verification email to the user
export const sendVerificationEmail = async (email: string, token: string) => {
  const { data, error } = await resend.emails.send({
    from: 'AI Learn <onboarding@resend.dev>',
    to: email,
    subject: 'Confirm your email',
    react: LinkEmail({ token })
  })

  if (error) {
    console.error("Email send error:", error);
    return { error };
  }

  return { data };
}

// Send password reset token to user
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const { data, error } = await resend.emails.send({
    from: 'AI Learn <onboarding@resend.dev>',
    to: email,
    subject: 'Reset your password',
    react: ResetPassword({ token })
  })

  if (error) {
    console.error("Reset email send error:", error);
    return { error };
  }

  return { data };
}
