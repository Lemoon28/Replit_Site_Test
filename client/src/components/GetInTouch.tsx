import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GetInTouch() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-portfolio-text-dark mb-4" data-testid="text-contact-title">
            Get In Touch
          </h2>
          <p className="text-lg text-portfolio-text-light max-w-2xl mx-auto" data-testid="text-contact-description">
            Ready to start your next project? Let's discuss how I can help.
          </p>
        </div>

        {/* Centered Contact Info */}
        <div className="max-w-4xl mx-auto">
          <div className="animate-slide-up">
            <h3 className="text-2xl font-semibold text-portfolio-text-dark mb-8 text-center" data-testid="text-lets-connect">
              Let's Connect
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Email */}
              <div className="text-center">
                <div className="bg-portfolio-primary bg-opacity-10 p-4 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Mail className="text-portfolio-primary text-xl w-6 h-6" />
                </div>
                <div className="text-portfolio-text-dark font-medium mb-2">Email</div>
                <a 
                  href="mailto:hello@portfolio.com" 
                  className="text-portfolio-primary hover:text-portfolio-primary-hover transition-colors"
                  data-testid="link-email"
                >
                  hello@portfolio.com
                </a>
              </div>

              {/* Phone */}
              <div className="text-center">
                <div className="bg-portfolio-primary bg-opacity-10 p-4 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Phone className="text-portfolio-primary text-xl w-6 h-6" />
                </div>
                <div className="text-portfolio-text-dark font-medium mb-2">Phone</div>
                <a 
                  href="tel:+1-555-123-4567" 
                  className="text-portfolio-primary hover:text-portfolio-primary-hover transition-colors"
                  data-testid="link-phone"
                >
                  +1 (555) 123-4567
                </a>
              </div>

              {/* Location */}
              <div className="text-center">
                <div className="bg-portfolio-primary bg-opacity-10 p-4 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="text-portfolio-primary text-xl w-6 h-6" />
                </div>
                <div className="text-portfolio-text-dark font-medium mb-2">Location</div>
                <div className="text-portfolio-text-light" data-testid="text-location">
                  San Francisco, CA
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="text-center">
              <h4 className="text-lg font-medium text-portfolio-text-dark mb-6" data-testid="text-follow-me">
                Follow Me
              </h4>
              <div className="flex justify-center space-x-4">
                <a 
                  href="#" 
                  className="bg-portfolio-primary bg-opacity-10 p-3 rounded-lg hover:bg-portfolio-primary hover:text-white transition-colors social-icon"
                  data-testid="link-linkedin"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="bg-portfolio-primary bg-opacity-10 p-3 rounded-lg hover:bg-portfolio-primary hover:text-white transition-colors social-icon"
                  data-testid="link-twitter"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="bg-portfolio-primary bg-opacity-10 p-3 rounded-lg hover:bg-portfolio-primary hover:text-white transition-colors social-icon"
                  data-testid="link-dribbble"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="bg-portfolio-primary bg-opacity-10 p-3 rounded-lg hover:bg-portfolio-primary hover:text-white transition-colors social-icon"
                  data-testid="link-behance"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 2-5.101 2-2.829 0-5.624-1.345-5.624-5.124 0-3.984 2.685-5.876 5.624-5.876 1.665 0 3.463.404 4.274 1.135.44.317.749.69.749 1.365 0 .448-.074.654-.187.958-.2.548-.511.97-1.057 1.257l4.248.764c.084-.449.084-.749.084-1.218 0-3.109-2.325-6.261-8.11-6.261-5.988 0-10.626 4.12-10.626 10.505 0 6.624 4.783 10.495 10.626 10.495 5.336 0 8.848-3.263 8.848-8.298 0-.634-.057-1.504-.19-2.702zm-9.411-5.849c-.316-.417-.925-.633-1.828-.633-1.419 0-1.996.633-1.996 1.633h3.731c.001-1.017-.591-1.633-.907-2zm8.828 0c-.316-.417-.925-.633-1.828-.633-1.419 0-1.996.633-1.996 1.633h3.731c.001-1.017-.591-1.633-.907-2z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
