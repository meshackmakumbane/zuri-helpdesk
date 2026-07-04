export const verificationCodeTemplate = (businessName, verificationCode)=>`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Email</title>
</head>
<body style="margin:0; padding:0; background:#f5f7fb; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb; padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td align="center" style="background:#2F8CFF; padding:30px;">
              <h1 style="color:#ffffff; margin:0;">Zuri Helpdesk</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:40px;">
              <h2 style="margin-top:0; color:#222;">
                Verify your email address
              </h2>

              <p style="font-size:16px; line-height:1.6; color:#555;">
                Hi ${businessName},
              </p>

              <p style="font-size:16px; line-height:1.6; color:#555;">
                Thanks for signing up for <strong>Zuri Helpdesk</strong>.
                Please use the verification code below to complete your registration.
              </p>

              <div style="text-align:center; margin:35px 0;">
                <span style="
                  display:inline-block;
                  background:#f3f4f6;
                  color:#2F8CFF;
                  font-size:34px;
                  font-weight:bold;
                  letter-spacing:10px;
                  padding:18px 40px;
                  border-radius:8px;
                ">
                  ${verificationCode}
                </span>
              </div>

              <p style="font-size:15px; color:#666;">
                This verification code will expire in
                <strong>10 minutes</strong>.
              </p>

              <p style="font-size:15px; color:#666;">
                If you didn't create a Zuri Helpdesk account,
                you can safely ignore this email.
              </p>

              <hr style="border:none; border-top:1px solid #e5e7eb; margin:35px 0;" />

              <p style="font-size:13px; color:#999; text-align:center;">
                Need help? Reply to this email and our team will be happy to assist you.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background:#fafafa; padding:20px;">
              <p style="margin:0; font-size:13px; color:#888;">
                © 2026 Zuri Helpdesk. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

export const inviteConsultantTemplate = (businessName, link) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>You're Invited</title>
</head>

<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb;padding:40px 20px;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.08);">

<tr>
<td style="background:#2563eb;padding:35px;text-align:center;">
<h1 style="margin:0;color:#ffffff;font-size:30px;">
Zuri Helpdesk
</h1>
<p style="margin-top:10px;color:#dbeafe;font-size:16px;">
Customer Support Made Simple
</p>
</td>
</tr>

<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;color:#111827;">
You've been invited!
</h2>

<p style="font-size:16px;line-height:1.8;color:#4b5563;">
<strong>${businessName}</strong> has invited you to join their support team on
<strong>Zuri Helpdesk</strong> as a consultant.
</p>

<p style="font-size:16px;line-height:1.8;color:#4b5563;">
Click the button below to create your account and get started.
</p>

<table cellpadding="0" cellspacing="0" style="margin:35px auto;">
<tr>
<td align="center" bgcolor="#2563eb" style="border-radius:8px;">
<a href="${link}"
style="
display:inline-block;
padding:16px 34px;
font-size:16px;
font-weight:bold;
color:#ffffff;
text-decoration:none;
">
Create My Account
</a>
</td>
</tr>
</table>

<p style="font-size:14px;color:#6b7280;line-height:1.7;">
If the button doesn't work, copy and paste the following link into your browser:
</p>

<p style="word-break:break-all;">
<a href="${link}" style="color:#2563eb;">
${link}
</a>
</p>

<hr style="border:none;border-top:1px solid #e5e7eb;margin:35px 0;">

<p style="font-size:14px;color:#6b7280;line-height:1.7;">
For your security, this invitation link will expire after <strong>24 hours</strong>.
If you weren't expecting this invitation, you can safely ignore this email.
</p>

</td>
</tr>

<tr>
<td style="padding:25px;background:#f9fafb;text-align:center;">

<p style="margin:0;font-size:13px;color:#9ca3af;">
© ${new Date().getFullYear()} Zuri Helpdesk. All rights reserved.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;