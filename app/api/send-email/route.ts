// app/api/send-email/rout.ts
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { name, email, subject, message, to, type = 'contact' } = await request.json()

    // Validate input
    if (!name || !email || !subject || !message || !to) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use other services like SendGrid, Mailgun, etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Email content based on form type
    let emailContent
    let emailSubject

    if (type === 'service-inquiry') {
      emailSubject = subject
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Service Inquiry</h2>
          <p style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
            You have received a new service inquiry from your website.
          </p>
          
          <h3 style="color: #555;">Inquiry Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service Requested:</strong> ${subject.replace('Service Inquiry: ', '')}</p>
          
          <h3 style="color: #555;">Project Details:</h3>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          
          <p style="margin-top: 20px; font-size: 12px; color: #777; text-align: center;">
            This email was sent from your website services page.
          </p>
        </div>
      `
    } else {
      // Default contact form email
      emailSubject = subject
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
            You have received a new message from your website contact form.
          </p>
          
          <h3 style="color: #555;">Contact Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          
          <h3 style="color: #555;">Message:</h3>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          
          <p style="margin-top: 20px; font-size: 12px; color: #777; text-align: center;">
            This email was sent from your website contact form.
          </p>
        </div>
      `
    }

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: emailSubject,
      replyTo: email,
      html: emailContent,
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    // Send a success response
    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}