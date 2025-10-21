import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json()

    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "fahimzarif678@gmail.com",
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Message from ${name}</h2>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    })

    if (result.error) {
      return Response.json({ error: result.error.message }, { status: 400 })
    }

    return Response.json({ success: true, id: result.data.id })
  } catch (error) {
    console.error("Email sending error:", error)
    return Response.json({ error: "Failed to send email" }, { status: 500 })
  }
}
