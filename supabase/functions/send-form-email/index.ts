import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  try {
    const payload = await req.json()
    const { record, type } = payload

    // record is the new row from form_submissions
    const { type: formType, data, email } = record

    // Format the email content based on form type
    let subject = `New ${formType.toUpperCase()} Submission - IRID Hub`
    let htmlContent = `
      <h1>New Form Submission</h1>
      <p><strong>Type:</strong> ${formType}</p>
      <p><strong>From:</strong> ${email}</p>
      <hr />
      <h3>Submission Details:</h3>
      <ul>
        ${Object.entries(data).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}
      </ul>
      <hr />
      <p>This is an automated notification from the IRID Institute Hub.</p>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'IRID Hub <onboarding@resend.dev>', // You can change this once you verify your domain on Resend
        to: ['info@iridinstitute.so'],
        subject: subject,
        html: htmlContent,
      }),
    })

    const result = await res.json()
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
