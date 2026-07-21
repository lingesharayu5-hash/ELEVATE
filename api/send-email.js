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

    const data = await resend.emails.send({
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

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to send email",
    });
  }
}