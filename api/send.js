import { Resend } from "resend";

const resend = new Resend("re_PpZjP1oR_HsUXp1bfWBzRSkTtY7yDKT1U");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { to, subject, body } = req.body;

    const data = await resend.emails.send({
      from: "PeakOffers <deals@peakoffers.tech>",
      to,
      subject,
      html: `
        <div style="font-family:Arial;padding:20px;line-height:1.6;">
          ${body.replace(/\n/g, "<br/>")}
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}