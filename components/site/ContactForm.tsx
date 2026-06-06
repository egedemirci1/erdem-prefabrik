"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { z } from "zod";

function sanitize(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

type FieldErrors = Partial<Record<"name" | "phone" | "email" | "message" | "_form", string>>;

const ContactForm = () => {
  const t = useTranslations("contactForm");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("nameMin")).max(80, t("nameMax")),
        phone: z
          .string()
          .min(10, t("phoneMin"))
          .max(20, t("phoneMax"))
          .regex(/^[+]?[\d\s()-]{10,20}$/, t("phoneInvalid")),
        email: z.email(t("emailInvalid")),
        message: z.string().min(10, t("messageMin")).max(500, t("messageMax")),
      }),
    [t]
  );

  const validate = (): boolean => {
    const result = contactSchema.safeParse(formData);
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors: FieldErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof FieldErrors;
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    setErrors(fieldErrors);
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", phone: "", email: "", message: "" });
      }, 2500);
      return;
    }
    if (!validate()) return;

    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;
    if (!scriptUrl) {
      setErrors({ _form: t("configError") });
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("type", "iletisim");
      formDataToSend.append("name", sanitize(formData.name));
      formDataToSend.append("phone", sanitize(formData.phone));
      formDataToSend.append("email", sanitize(formData.email));
      formDataToSend.append("message", sanitize(formData.message));

      await fetch(scriptUrl, { method: "POST", mode: "no-cors", body: formDataToSend });

      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", phone: "", email: "", message: "" });
        setErrors({});
      }, 2500);
    } catch {
      setIsSubmitting(false);
      setErrors({ _form: t("networkError") });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof FieldErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  return (
    <div className="rounded-2xl p-6 lg:p-8 border border-foreground/10 bg-foreground/5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      {isSubmitted ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-light text-foreground mb-2">{t("thanks")}</h3>
          <p className="text-muted-foreground">{t("success")}</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input type="text" id="website" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
          </div>

          <div>
            <Label htmlFor="name" className="text-foreground font-medium">{t("name")}</Label>
            <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required maxLength={80} className={`mt-2 h-12 rounded-xl bg-foreground/5 border-border focus:border-accent focus:ring-accent/20 ${errors.name ? "border-red-500" : ""}`} placeholder={t("namePlaceholder")} />
            {errors.name && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="phone" className="text-foreground font-medium">{t("phone")}</Label>
            <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required maxLength={20} className={`mt-2 h-12 rounded-xl bg-foreground/5 border-border focus:border-accent focus:ring-accent/20 ${errors.phone ? "border-red-500" : ""}`} placeholder="0533 123 45 67" />
            {errors.phone && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
          </div>

          <div>
            <Label htmlFor="email" className="text-foreground font-medium">{t("email")}</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className={`mt-2 h-12 rounded-xl bg-foreground/5 border-border focus:border-accent focus:ring-accent/20 ${errors.email ? "border-red-500" : ""}`} placeholder={t("emailPlaceholder")} />
            {errors.email && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="message" className="text-foreground font-medium">{t("message")}</Label>
            <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} maxLength={500} className={`mt-2 rounded-xl bg-foreground/5 border-border focus:border-accent focus:ring-accent/20 resize-none ${errors.message ? "border-red-500" : ""}`} placeholder={t("messagePlaceholder")} />
            <div className="mt-1 flex items-center justify-between">
              {errors.message ? <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.message}</p> : <span />}
              <span className="text-xs text-muted-foreground">{formData.message.length}/500</span>
            </div>
          </div>

          {errors._form && (
            <p className="text-sm text-red-500 flex items-center gap-1 p-3 bg-red-50 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" /> {errors._form}
            </p>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full bg-accent hover:bg-accent/90 text-white h-12 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50">
            {isSubmitting ? t("submitting") : t("submit")}
            {!isSubmitting && <Send className="ml-2 h-5 w-5" />}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
