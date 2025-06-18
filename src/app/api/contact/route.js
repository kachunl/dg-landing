const nodemailer = require("nodemailer");

export async function GET() {
    return Response.json(
        { 
            message: "Contact API is working!",
            timestamp: new Date().toISOString(),
            env_check: {
                EMAIL_USER: !!process.env.EMAIL_USER,
                EMAIL_PASS: !!process.env.EMAIL_PASS
            }
        },
        { status: 200 }
    );
}

export async function POST(request) {
    try {
        const { name, email, subject, message } = await request.json();

        if (!name || !email || !subject || !message) {
            return Response.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return Response.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587, // gmail port
            secure: false, // use STARTTLS
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const timestamp = new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long", 
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

        const htmlTemplate = `
            <!DOCTYPE html>
                <html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Contact Form Submission</title>

                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; }
                    </style>
                </head>

                <body style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 40px 20px; min-height: 100vh;">
                    <div style="max-width: 600px; margin: 0 auto;">
                    
                        <!-- Success Header -->
                        <div style="text-align: center; margin-bottom: 40px;">
                            <h1 style="font-size: 32px; font-weight: bold; color: #0f172a; margin-bottom: 8px;">New Contact Form Submission!</h1>

                            <p style="color: #64748b; font-size: 16px;">You have received a new message from your website.</p>
                        </div>

                        <!-- Main Card -->
                        <div style="background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); overflow: hidden;">
                            
                            <!-- Card Header -->
                            <div style="padding: 24px 24px 16px 24px; border-bottom: 1px solid #e2e8f0;">
                                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                                    <h2 style="font-size: 20px; font-weight: 600; color: #1e293b;">Contact Form Submission</h2>
                                </div>
                                
                                <div style="display: flex; align-items: center; gap: 8px; color: #64748b; font-size: 14px;">
                                    ${timestamp}
                                </div>
                            </div>

                            <!-- Card Content -->
                            <div style="padding: 24px;">
                                
                                <!-- Contact Information Grid -->
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
                                    
                                    <!-- Name -->
                                    <div>
                                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                                            <span style="font-size: 14px; font-weight: 500; color: #374151;">Name</span>
                                        </div>

                                        <p style="color: #0f172a; font-weight: 500; background: #f8fafc; padding: 8px 12px; border-radius: 8px;">${name}</p>
                                    </div>

                                    <br />

                                    <!-- Email -->
                                    <div>
                                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                                            <span style="font-size: 14px; font-weight: 500; color: #374151;">Email</span>
                                        </div>

                                        <p style="background: #eff6ff; padding: 8px 12px; border-radius: 8px;">
                                            <a href="mailto:${email}" style="color: #2563eb; font-weight: 500; text-decoration: none;">${email}</a>
                                        </p>
                                    </div>
                                </div>

                                <!-- Separator -->
                                <hr style="border: none; height: 1px; background: #e2e8f0; margin: 24px 0;">

                                <!-- Subject -->
                                <div style="margin-bottom: 24px;">
                                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                                        <span style="font-size: 14px; font-weight: 500; color: #374151;">Subject</span>
                                    </div>

                                    <div>
                                        <span style="background: #f3e8ff; color: #7c3aed; padding: 4px 12px; border-radius: 6px; font-size: 14px; font-weight: 500;">${subject}</span>
                                    </div>
                                </div>

                                <!-- Separator -->
                                <hr style="border: none; height: 1px; background: #e2e8f0; margin: 24px 0;">

                                <!-- Message -->
                                <div>
                                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                                        <span style="font-size: 14px; font-weight: 500; color: #374151;">Message</span>
                                    </div>

                                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
                                        <p style="color: #1e293b; white-space: pre-wrap; line-height: 1.6;">${message}</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <!-- Footer -->
                        <div style="text-align: center; margin-top: 32px;">
                            <p style="font-size: 14px; color: #64748b; background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(10px); border-radius: 8px; padding: 8px 16px; display: inline-block;">
                                This email was sent from your website contact form.
                            </p>
                        </div>

                    </div>
                </body>
            </html>
        `;

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: "ezra@thedigigoat.com",
            subject: `Contact Form: ${subject}`,
            html: htmlTemplate,
            replyTo: email
        };

        const info = await new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Email error:", error.message);
                    reject(error);
                }
                
                else {
                    console.log("Message sent: %s", info.messageId);
                    resolve(info);
                }
            });
        });

        return Response.json(
            { message: "Email sent successfully!", messageId: info.messageId },
            { status: 200 }
        );

    }
    
    catch (error) {
        console.error("Error sending email:", error);
        return Response.json(
            { error: "Failed to send email. Please try again." },
            { status: 500 }
        );
    }
}