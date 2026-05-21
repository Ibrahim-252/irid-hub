import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="irid-container">
            <h1 className="text-3xl md:text-4xl font-display font-bold">Terms of Use</h1>
            <p className="mt-3 text-primary-foreground/70 text-sm">Last updated: February 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="irid-section">
          <div className="irid-container max-w-3xl">
            <div className="prose prose-lg max-w-none space-y-8 text-foreground/80">
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
                <p className="leading-relaxed">
                  By accessing and using the website of IRID — Institute for Research, Insights and Dialogue ("IRID", "we", "our"), you accept and agree to be bound by these Terms of Use. If you do not agree, please do not use our website.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">2. Use of Website</h2>
                <p className="leading-relaxed mb-3">You agree to use this website only for lawful purposes and in a manner that does not:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Infringe the rights of others or restrict their use of the website</li>
                  <li>Violate any applicable local, national, or international law</li>
                  <li>Transmit harmful, threatening, or objectionable material</li>
                  <li>Attempt to gain unauthorized access to our systems or networks</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">3. Intellectual Property</h2>
                <p className="leading-relaxed">
                  All content on this website — including text, graphics, logos, images, research publications, and software — is the property of IRID Institute or its content providers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">4. Research & Publications</h2>
                <p className="leading-relaxed">
                  Research findings, reports, and publications shared on this website are for informational and educational purposes only. They do not constitute professional advice. IRID makes reasonable efforts to ensure accuracy but does not guarantee completeness or timeliness of information.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">5. User Submissions</h2>
                <p className="leading-relaxed">
                  Any information, feedback, or materials you submit to IRID through this website may be used by IRID for its research, communication, and operational purposes. You represent that you have the right to submit such content and that it does not violate third-party rights.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">6. Disclaimer of Warranties</h2>
                <p className="leading-relaxed">
                  This website is provided on an "as is" and "as available" basis. IRID makes no warranties, expressed or implied, regarding the website's operation, accuracy, reliability, or availability. We do not warrant that the website will be uninterrupted or error-free.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">7. Limitation of Liability</h2>
                <p className="leading-relaxed">
                  To the fullest extent permitted by law, IRID shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use the website.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">8. External Links</h2>
                <p className="leading-relaxed">
                  Our website may contain links to external websites. These links are provided for convenience only. IRID does not endorse and is not responsible for the content, accuracy, or practices of third-party websites.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">9. Modifications</h2>
                <p className="leading-relaxed">
                  IRID reserves the right to modify these Terms of Use at any time. Changes take effect immediately upon posting. Continued use of the website after changes constitutes acceptance of the updated terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">10. Governing Law</h2>
                <p className="leading-relaxed">
                  These Terms of Use shall be governed by and construed in accordance with the laws of the Federal Republic of Somalia.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">11. Contact Us</h2>
                <p className="leading-relaxed">
                  If you have any questions regarding these Terms, please contact us:
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

export default Terms;
