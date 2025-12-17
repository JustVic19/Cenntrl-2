import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not defined in environment variables');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Tutorly <onboarding@resend.dev>', // Update to your verified domain
            to: [to],
            subject,
            html,
        });

        if (error) {
            console.error('Email send error:', error);
            throw new Error(`Failed to send email: ${error.message}`);
        }

        return data;
    } catch (error) {
        console.error('Email service error:', error);
        throw error;
    }
}

export async function sendWelcomeEmail({
    email,
    studentName,
    setupLink,
}: {
    email: string;
    studentName: string;
    setupLink: string;
}) {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎓 Welcome to Tutorly!</h1>
          </div>
          <div class="content">
            <h2>Hi ${studentName}!</h2>
            <p>Thank you for enrolling with Tutorly. Your payment has been processed successfully.</p>
            <p><strong>Next Step: Set up your student account</strong></p>
            <p>Click the button below to create your account and start learning:</p>
            <a href="${setupLink}" class="button">Set Up My Account →</a>
            <p>This link will expire in 7 days.</p>
            <p>If you have any questions, feel free to reply to this email.</p>
            <p>Happy learning!<br>The Tutorly Team</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Tutorly. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

    return sendEmail({
        to: email,
        subject: 'Welcome to Tutorly - Set Up Your Account',
        html,
    });
}

export async function sendVerificationEmail({
    email,
    name,
    verificationUrl,
}: {
    email: string;
    name: string;
    verificationUrl: string;
}) {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; }
          .button { display: inline-block; background: #4facfe; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✉️ Verify Your Email</h1>
          </div>
          <div class="content">
            <h2>Hi ${name}!</h2>
            <p>Please verify your email address to complete your Tutorly account setup.</p>
            <a href="${verificationUrl}" class="button">Verify Email Address →</a>
            <p>This link will expire in 24 hours.</p>
            <p>If you didn't create a Tutorly account, you can safely ignore this email.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Tutorly. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

    return sendEmail({
        to: email,
        subject: 'Verify Your Tutorly Email Address',
        html,
    });
}

export async function sendPasswordResetEmail({
    email,
    name,
    resetUrl,
}: {
    email: string;
    name: string;
    resetUrl: string;
}) {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; }
          .button { display: inline-block; background: #f093fb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Reset Your Password</h1>
          </div>
          <div class="content">
            <h2>Hi ${name}!</h2>
            <p>We received a request to reset your Tutorly password.</p>
            <a href="${resetUrl}" class="button">Reset Password →</a>
            <p>This link will expire in 1 hour.</p>
            <div class="warning">
              <strong>⚠️ Security Notice:</strong><br>
              If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
            </div>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Tutorly. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

    return sendEmail({
        to: email,
        subject: 'Reset Your Tutorly Password',
        html,
    });
}
