const nodemailer = require("nodemailer");
const Inquiry = require("../models/Inquiry");

// Helper: Send email notification with graceful fallback to server logs
const sendEmail = async (subject, htmlBody, toEmail) => {
    const isMailerConfigured =
        process.env.EMAIL_USER &&
        process.env.EMAIL_USER !== "your_smtp_email@gmail.com" &&
        process.env.EMAIL_PASS;

    if (isMailerConfigured) {
        try {
            // Setup Gmail SMTP transporter
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: `"Nexion Control" <${process.env.EMAIL_USER}>`,
                to: toEmail,
                subject: subject,
                html: htmlBody
            };

            await transporter.sendMail(mailOptions);
            console.log(`Mailer: Email sent [${subject}] successfully to ${toEmail}.`);
        } catch (error) {
            console.error(`Mailer Error: Failed to deliver email: ${error.message}`);
        }
    } else {
        console.log("\n╔═══════════════════════════════════════════════════════════╗");
        console.log(`║ Nodemailer sandbox simulator (SMTP credentials unconfigured)║`);
        console.log(`║ TO:      ${toEmail.padEnd(49)}║`);
        console.log(`║ SUBJECT: ${subject.padEnd(49)}║`);
        console.log(`╠═══════════════════════════════════════════════════════════╣`);
        // Strip tags for basic logging
        const cleanBody = htmlBody.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");
        console.log(`║ CONTENT: ${cleanBody.substring(0, 48).padEnd(49)}║`);
        console.log("╚═══════════════════════════════════════════════════════════╝\n");
    }
};

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private
const getInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new inquiry submission
// @route   POST /api/inquiries
// @access  Public
const createInquiry = async (req, res) => {
    try {
        const { name, email, company, budget, projectType, message } = req.body;

        if (!name || !email || !projectType || !message) {
            return res.status(400).json({ message: "Please fill in all required fields" });
        }

        const inquiry = await Inquiry.create({
            name,
            email,
            company: company || "None",
            budget: budget || "Not Specified",
            projectType,
            message,
            date: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }),
            status: "new"
        });

        // Trigger email notification to Admin
        const adminEmail = process.env.EMAIL_TO || "hello@nexion.solutions";
        const emailSubject = `🚨 New Nexion Lead: ${name} (${projectType})`;
        const emailBody = `
            <h3>New Inquiry Submitted on Nexion Solutions</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || "Not specified"}</p>
            <p><strong>Service Requested:</strong> ${projectType}</p>
            <p><strong>Budget Range:</strong> ${budget || "Not specified"}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="background: #f4f4f5; padding: 12px; border-left: 4px solid #18181b;">
                ${message.replace(/\n/g, "<br>")}
            </blockquote>
            <hr />
            <p>Log in to your <a href="http://localhost:5173/admin">Admin Panel</a> to read more and reply.</p>
        `;
        // Send email in background asynchronously
        sendEmail(emailSubject, emailBody, adminEmail);

        res.status(201).json(inquiry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle inquiry read/unread status
// @route   PUT /api/inquiries/:id
// @access  Private
const toggleInquiryStatus = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry not found" });
        }

        // Toggle state
        inquiry.status = inquiry.status === "new" ? "read" : "new";
        
        const updated = await inquiry.save();
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Send email reply and set status to replied
// @route   POST /api/inquiries/:id/reply
// @access  Private
const replyInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry not found" });
        }

        const { replyMessage } = req.body;
        if (!replyMessage) {
            return res.status(400).json({ message: "Reply message body is required" });
        }

        // Send email reply to the client
        const subject = `Re: Your Inquiry with Nexion Solutions`;
        const htmlContent = `
            <p>Hi ${inquiry.name},</p>
            <p>Thank you for reaching out to Nexion Solutions regarding your interest in <strong>${inquiry.projectType}</strong>. Here is the response from our team:</p>
            <div style="background: #fafafa; border: 1px solid #e4e4e7; border-radius: 12px; padding: 20px; color: #18181b; font-size: 14px; line-height: 1.6; margin: 20px 0;">
                ${replyMessage.replace(/\n/g, "<br>")}
            </div>
            <p>If you have any further questions, feel free to reply directly to this email.</p>
            <br />
            <p>Best regards,</p>
            <p><strong>Nexion Solutions Team</strong><br/>Colombo, Sri Lanka · Global Operations</p>
        `;

        await sendEmail(subject, htmlContent, inquiry.email);

        // Update inquiry status
        inquiry.status = "replied";
        const updated = await inquiry.save();

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private
const deleteInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry not found" });
        }

        await inquiry.deleteOne();
        res.json({ message: "Inquiry deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getInquiries,
    createInquiry,
    toggleInquiryStatus,
    replyInquiry,
    deleteInquiry
};
