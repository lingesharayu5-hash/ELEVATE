import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed",
    });
  }

  try {
    const {
      fullName,
      businessName,
      email,
      phone,
      businessType,
      monthlyBudget,
      services,
    } = req.body;

    const adminEmail = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["lingesharayu5@gmail.com"], // Replace with your email
      subject: `🚀 New Inquiry from ${fullName}`,
      html: `
        <h2>New Inquiry Received</h2>

        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Business:</strong> ${businessName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Business Type:</strong> ${businessType}</p>
        <p><strong>Monthly Budget:</strong> ${monthlyBudget}</p>
        <p><strong>Services:</strong> ${services.join(", ")}</p>
      `,
    });
    
    console.log("Customer email:", email);
    const clientEmail = await resend.emails.send({
  from: "onboarding@resend.dev",
  to: [email],
  subject: "Thank you for contacting Elevate 🚀",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2>Thank you, ${fullName}! 👋</h2>

      <p>We have successfully received your inquiry.</p>

      <p>Our team will review your requirements and get back to you as soon as possible.</p>

      <hr>

      <p><strong>Your submitted details:</strong></p>

      <ul>
        <li><strong>Business:</strong> ${businessName}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
      </ul>

      <p>We appreciate your interest in <strong>Elevate</strong>.</p>

      <p>Have a wonderful day! 🚀</p>
    </div>
  `,
});
console.log("Client email response:", clientEmail);

    return res.status(200).json(adminEmail);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to send email",
    });
  }
}