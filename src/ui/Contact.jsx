import React from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { SlSocialLinkedin } from "react-icons/sl";
import { useContactForm } from "../hooks/useContactForm";

const contactInfo = [
  { icon: Mail, label: "Email", value: "youneslam123@gmail.com", href: "mailto:youneslam123@gmail.com" },
  { icon: Phone, label: "Phone", value: "0694039188", href: "tel:+212694039188" },
  { icon: MapPin, label: "Location", value: "Ain Attig, Temara", href: null },
];

const socialLinks = [
  { icon: SiGithub, label: "GitHub", href: "https://github.com/YounessLamnaouar" },
  { icon: SlSocialLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/youness-lamnaouar-939a79353/?isSelfProfile=false" },
];

const ContactPage = () => {
  const {
    formData,
    errors,
    status,
    focusedField,
    setFocusedField,
    handleChange,
    handleSubmit,
    resetStatus,
  } = useContactForm();

  const inputClasses = (fieldName) => `
    w-full px-5 py-4 bg-slate-50 border-2 rounded-2xl text-slate-900
    placeholder:text-slate-400 transition-all duration-300 outline-none
    ${
      errors[fieldName]
        ? "border-red-300 focus:border-red-500 bg-red-50/30"
        : focusedField === fieldName
        ? "border-amber-400 bg-white shadow-[0_0_0_4px_rgba(99,102,241,0.1)]"
        : "border-slate-200 hover:border-slate-300 focus:border-indigo-500"
    }
  `;

  return (
    <section id="contact" className="w-full min-h-screen py-6 overflow-hidden">
      <h1 className="text-white font-bold text-4xl md:text-6xl lg:text-8xl lg:mt-20 tracking-tighter text-center mt-4 aclonica-regular">
        Contact
      </h1>

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mt-10 pb-24">
        <div className="w-full grid lg:grid-cols-5 gap-6 lg:gap-8">
          <div className="lg:col-span-2 w-full space-y-6">
            <div className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.06)] border border-slate-100">
              <h2 className="text-xl aclonica-regular font-bold text-[#0b0f14] mb-2">Contact Info</h2>
              <p className="text-slate-500 text-xs mb-8">Prefer to reach out directly? Here's how.</p>

              <div className="space-y-5">
                {contactInfo.map((item, index) => (
                  <div key={index} className="group flex items-start gap-2 p-2 rounded-2xl hover:bg-slate-50 transition-colors duration-300">
                    <div className="p-3 rounded-xl bg-indigo-50 border border-amber-400 text-amber-400 group-hover:bg-amber-400 group-hover:text-[#0b0f14] transition-all duration-300">
                      <item.icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-[#0b0f14] aclonica-regular text-xs font-medium hover:text-amber-400 transition-colors duration-200 flex items-center gap-1 group/link break-all">
                          {item.value}
                          <ArrowUpRight size={14} className="shrink-0 opacity-0 -translate-y-1 translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all duration-200" />
                        </a>
                      ) : (
                        <p className="text-[#0b0f14] text-xs aclonica-regular font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-4">Follow Me</p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="p-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-amber-400 hover:text-[#0b0f14] transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                      <social.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full bg-emerald-50 rounded-3xl p-6 border border-emerald-100 flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-40" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm aclonica-regular text-emerald-900">Available for work</p>
                <p className="text-sm text-emerald-700">Open to freelance & full-time opportunities</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 w-full">
            <div className="w-full bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_0_40px_rgba(0,0,0,0.06)] border border-slate-100">
              <h2 className="text-xl aclonica-regular font-bold text-[#0b0f14] mb-2">Send a Message</h2>
              <p className="text-slate-500 text-xs mb-8">Fill out the form and I'll respond within 24 hours.</p>

              {status === "success" ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Message Sent!</h3>
                  <p className="text-slate-500 mb-8 max-w-md mx-auto">
                    Thanks for reaching out. I've received your message and will get back to you shortly.
                  </p>
                  <button onClick={resetStatus} className="px-8 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors duration-200">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                      id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Youness Lam"
                        className={`${inputClasses("name")} aclonica-regular text-xs md:text-sm`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                      id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="youness@example.com"
                        className={`${inputClasses("email")} aclonica-regular text-xs md:text-sm`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <input
                    id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("subject")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Project Inquiry"
                      className={`${inputClasses("subject")} aclonica-regular text-xs md:text-sm`}
                    />
                    {errors.subject && (
                      <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                    id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell me about your project, timeline, and budget..."
                      rows={5}
                      className={`${inputClasses("message")} resize-none aclonica-regular text-xs md:text-sm`}
                    />
                    <div className="flex items-center justify-between mt-1.5">
                      {errors.message ? (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.message}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span className="text-xs text-slate-400">{formData.message.length} chars</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-semibold rounded-2xl hover:bg-amber-400 hover:text-[#0b0f14] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 group aclonica-regular"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                      </>
                    )}
                  </button>

                  {status === "error" && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm flex items-center gap-2">
                      <AlertCircle size={18} />
                      Something went wrong. Please try again or email me directly.
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;