import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="irid-container">
            <h1 className="text-3xl md:text-4xl font-display font-bold">Privacy Policy</h1>
            <p className="mt-3 text-primary-foreground/70 text-sm">Last updated: February 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="irid-section">
          <div className="irid-container max-w-3xl">
            <div className="prose prose-lg max-w-none space-y-8 text-foreground/80">
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">1. Introduction</h2>
                <p className="leading-relaxed">
                  IRID — Institute for Research, Insights and Dialogue ("IRID", "we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>iridinstitute.so</strong> and engage with our services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">2. Information We Collect</h2>
                <p className="leading-relaxed mb-3">We may collect the following types of information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Personal Information:</strong> Name, email address, phone number, and other details you voluntarily provide through our contact forms, event registrations, or newsletter sign-ups.</li>
                  <li><strong>Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, pages visited, and time spent on pages.</li>
                  <li><strong>Cookies:</strong> Small data files stored on your device to enhance your browsing experience and analyze website traffic.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To provide, operate, and maintain our website and services</li>
                  <li>To communicate with you about our research, programs, and events</li>
                  <li>To respond to inquiries and provide support</li>
                  <li>To analyze usage patterns and improve our website</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">4. Information Sharing</h2>
                <p className="leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. We may share information with trusted partners who assist us in operating our website or conducting our activities, provided they agree to keep your information confidential. We may also disclose information when required by law.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">5. Data Security</h2>
                <p className="leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">6. Your Rights</h2>
                <p className="leading-relaxed">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Access and receive a copy of the personal data we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal data</li>
                  <li>Withdraw consent for data processing at any time</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">7. Third-Party Links</h2>
                <p className="leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review their privacy policies.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">8. Changes to This Policy</h2>
                <p className="leading-relaxed">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">9. Contact Us</h2>
                <p className="leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="mt-2 leading-relaxed">
                  <strong>IRID — Institute for Research, Insights and Dialogue</strong><br />
                  Email: info@iridinstitute.so<br />
                  Phone: +252 906 791 195<br />
                  Location: Bosaso, Somalia
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
