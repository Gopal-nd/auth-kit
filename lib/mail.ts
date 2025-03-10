import {Resend} from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)


export const sendTwoFactorTokenEmail =async(email:string,token:string)=>{

  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Two Factor Auth CODE ',
    html: ` <div class="container">
<div class="header">
  <h2>Two Factor Auth OTP</h2>
</div>
<h1>${token}</h1>

<div class="footer">
  <p>&copy; 2025 auth-kit. All rights reserved.</p>
</div>
</div>`
})
}


export const sendPasswordResetEmail = async(email:string,token:string)=>{
  const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`

  const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Password Reset ',
      html: ` <div class="container">
  <div class="header">
    <h2>Reset Your Password</h2>
  </div>
  <p>Click Below button to reset :</p>
  <a href="${confirmLink}" class="button">Confirm Email</a>
  <p>If you did not sign up for this account, please ignore this email.</p>
  <div class="footer">
    <p>&copy; 2025 auth-kit. All rights reserved.</p>
  </div>
</div>`
    })

}

export const sendVerificationEmail = async(email:string,token:string)=>{
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

    const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Conform Your Email',
        html: ` <div class="container">
    <div class="header">
      <h2>Confirm Your Email Address</h2>
    </div>
    <p>Thank you for signing up! Please confirm your email address by clicking the button below:</p>
    <a href="${confirmLink}" class="button">Confirm Email</a>
    <p>If you did not sign up for this account, please ignore this email.</p>
    <div class="footer">
      <p>&copy; 2025 auth-kit. All rights reserved.</p>
    </div>
  </div>`
      })

}