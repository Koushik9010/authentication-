import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailClient, sender } from "./MailtrapConfig.js";

export const sendVerificationEmail = async (email, verificationCode) => {
  const recipient = [{ email }];

  try {
    const res = await mailClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationCode
      ),
      category: "Email Verification",
    });

    console.log("Email sent successfully", res);
  } catch (error) {
    console.error(`Error sending verification code`, error);
    throw new error(`Error sending verification email: ${error}`);
  }
};
