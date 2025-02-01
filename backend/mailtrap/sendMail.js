import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailClient, sender } from "./MailtrapConfig.js";

//send verification email
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

//send welcome email
export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const res = await mailClient.send({
      from: sender,
      to: recipient,
      template_uuid: "cebe3857-9058-4f32-a31f-799f8086c744",
      template_variables: {
        company_info_name: "Auth company ",
        name: name,
      },
    });

    console.log("Welcoms email sent successfully", res);
  } catch (error) {
    console.error("Error sending welcome emain", error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};
