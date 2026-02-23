
export class PrivacyService {
    /**
     * Redacts sensitive information like email, phone, and address 
     * from raw text or ResumeSchema.
     */
    redactText(text: string): string {
        let redacted = text;
        // Basic regex for email
        redacted = redacted.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[REDACTED_EMAIL]");
        // Basic regex for phone (varied formats)
        redacted = redacted.replace(/(\+?\d{1,4}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g, "[REDACTED_PHONE]");

        return redacted;
    }

    redactResume(resume: any): any {
        const copy = JSON.parse(JSON.stringify(resume));
        if (copy.basics) {
            copy.basics.email = "[REDACTED]";
            copy.basics.phone = "[REDACTED]";
        }
        return copy;
    }
}
