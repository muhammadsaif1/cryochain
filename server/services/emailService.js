const nodemailer = require("nodemailer");

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Beautiful HTML Email Template for CryoChain - New Note Received
const createNoteEmailTemplate = (noteData) => {
  const {
    firstName,
    lastName,
    email,
    organisation,
    role,
    areaOfInterest,
    message,
    createdAt,
  } = noteData;

  const fullName = `${firstName} ${lastName || ""}`.trim();
  const formattedDate = new Date(createdAt).toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "medium",
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New CryoChain Note Received</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 20px;
        }
        
        .email-container {
          max-width: 680px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        /* Header Section */
        .header {
          background: linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%);
          padding: 48px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .header::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          animation: pulse 4s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.3; }
        }
        
        .logo {
          font-size: 48px;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
        }
        
        .logo span {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          padding: 8px 20px;
          border-radius: 40px;
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
          margin-top: 16px;
          position: relative;
          z-index: 1;
        }
        
        /* Content Section */
        .content {
          padding: 48px 40px;
        }
        
        .greeting {
          font-size: 28px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 12px;
        }
        
        .subtitle {
          font-size: 16px;
          color: #718096;
          margin-bottom: 32px;
          border-left: 3px solid #667eea;
          padding-left: 16px;
        }
        
        /* Info Cards */
        .info-card {
          background: #f7fafc;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 24px;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }
        
        .info-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          border-color: #667eea;
        }
        
        .info-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        
        .info-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
        
        .info-title {
          font-size: 14px;
          font-weight: 600;
          color: #4a5568;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .info-value {
          font-size: 18px;
          font-weight: 600;
          color: #1a202c;
          margin-top: 8px;
          word-break: break-word;
        }
        
        /* Two Column Layout */
        .two-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
        }
        
        /* Message Section */
        .message-section {
          background: #ffffff;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px;
          margin-top: 24px;
        }
        
        .message-label {
          font-size: 14px;
          font-weight: 600;
          color: #4a5568;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .message-content {
          font-size: 16px;
          line-height: 1.6;
          color: #2d3748;
          background: #f7fafc;
          padding: 20px;
          border-radius: 12px;
          border-left: 4px solid #667eea;
        }
        
        /* Timeline Section */
        .timeline {
          margin-top: 32px;
          padding: 24px;
          background: linear-gradient(135deg, #667eea10 0%, #764ba210 100%);
          border-radius: 16px;
          text-align: center;
        }
        
        .timeline-label {
          font-size: 12px;
          font-weight: 600;
          color: #667eea;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        
        .timeline-value {
          font-size: 14px;
          color: #4a5568;
          font-family: monospace;
        }
        
        /* Action Button */
        .action-button {
          text-align: center;
          margin-top: 32px;
        }
        
        .button {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 14px 32px;
          border-radius: 40px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: transform 0.2s ease;
        }
        
        .button:hover {
          transform: translateY(-2px);
        }
        
        /* Footer */
        .footer {
          background: #1a202c;
          padding: 32px 40px;
          text-align: center;
        }
        
        .footer-text {
          color: #a0aec0;
          font-size: 14px;
          line-height: 1.6;
        }
        
        .footer-highlight {
          color: #667eea;
          font-weight: 600;
        }
        
        .social-links {
          margin-top: 20px;
          display: flex;
          justify-content: center;
          gap: 16px;
        }
        
        .social-link {
          color: #718096;
          text-decoration: none;
          font-size: 12px;
          transition: color 0.3s ease;
        }
        
        .social-link:hover {
          color: #667eea;
        }
        
        /* Responsive */
        @media (max-width: 600px) {
          .header {
            padding: 32px 20px;
          }
          
          .content {
            padding: 32px 20px;
          }
          
          .two-columns {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .greeting {
            font-size: 24px;
          }
        }
        
        /* Status Badge */
        .status-badge {
          display: inline-block;
          background: #48bb78;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          margin-left: 12px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <!-- Header -->
        <div class="header">
          <div class="logo">
            CRYO<span>CHAIN</span>
          </div>
          <div class="badge">
            📝 New Note Received
          </div>
        </div>
        
        <!-- Content -->
        <div class="content">
          <div class="greeting">
            New Note Received
            <span class="status-badge">Action Required</span>
          </div>
          
          <div class="subtitle">
            A new prospect has submitted their information through the CryoChain platform.
          </div>
          
          <!-- Contact Information -->
          <div class="two-columns">
            <div class="info-card">
              <div class="info-header">
                <div class="info-icon">👤</div>
                <div class="info-title">Full Name</div>
              </div>
              <div class="info-value">${fullName || "Not provided"}</div>
            </div>
            
            <div class="info-card">
              <div class="info-header">
                <div class="info-icon">📧</div>
                <div class="info-title">Email Address</div>
              </div>
              <div class="info-value">${email || "Not provided"}</div>
            </div>
          </div>
          
          <div class="two-columns">
            <div class="info-card">
              <div class="info-header">
                <div class="info-icon">🏢</div>
                <div class="info-title">Organisation</div>
              </div>
              <div class="info-value">${organisation || "Not provided"}</div>
            </div>
            
            <div class="info-card">
              <div class="info-header">
                <div class="info-icon">💼</div>
                <div class="info-title">Role / Title</div>
              </div>
              <div class="info-value">${role || "Not provided"}</div>
            </div>
          </div>
          
          <!-- Area of Interest -->
          <div class="info-card">
            <div class="info-header">
              <div class="info-icon">🎯</div>
              <div class="info-title">Area of Interest</div>
            </div>
            <div class="info-value">
              <span style="background: #e2e8f0; padding: 4px 12px; border-radius: 20px; font-size: 14px;">
                ${areaOfInterest || "General Enquiry"}
              </span>
            </div>
          </div>
          
          <!-- Message -->
          ${
            message
              ? `
          <div class="message-section">
            <div class="message-label">
              💬 Message from ${fullName}
            </div>
            <div class="message-content">
              "${message}"
            </div>
          </div>
          `
              : ""
          }
          
          <!-- Timeline -->
          <div class="timeline">
            <div class="timeline-label">📅 NOTE RECEIVED ON</div>
            <div class="timeline-value">${formattedDate}</div>
          </div>
          
          <!-- Action Button -->
          <div class="action-button">
            <a href="${process.env.ADMIN_DASHBOARD_URL || "#"}" class="button">
              View in Dashboard →
            </a>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <div class="footer-text">
            <strong class="footer-highlight">CryoChain Platform</strong><br />
            Powering Africa's Sustainable Infrastructure Revolution<br />
            Cold Chain · Edge Data Centres · Electric Logistics
          </div>
          <div class="social-links">
            <a href="#" class="social-link">Website</a>
            <span style="color: #4a5568;">•</span>
            <a href="#" class="social-link">Documentation</a>
            <span style="color: #4a5568;">•</span>
            <a href="#" class="social-link">Contact Support</a>
          </div>
          <div class="footer-text" style="margin-top: 20px; font-size: 12px;">
            This is an automated notification from CryoChain Platform.<br />
            Please respond within 24 hours for optimal conversion.
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Send email notification to admin only (no CC, no user email)
const sendNoteNotification = async (noteData) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@cryochain.com";
    const fromEmail = process.env.SMTP_FROM || "noreply@cryochain.com";

    const htmlContent = createNoteEmailTemplate(noteData);

    const mailOptions = {
      from: `"CryoChain Team" <${fromEmail}>`,
      to: adminEmail,
      subject: `📝 New Note Received - ${noteData.firstName} ${noteData.lastName || ""} (${noteData.areaOfInterest || "General Enquiry"})`,
      html: htmlContent,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
      },
    };

    await transporter.sendMail(mailOptions);

    console.log(
      `Email notification sent to admin for note from: ${noteData.email}`,
    );
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendNoteNotification };
