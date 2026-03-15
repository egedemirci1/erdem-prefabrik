"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { z } from "zod/v4";

// --- Sanitization ---
function sanitize(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

// --- Zod Validation Schema ---
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Ad Soyad en az 2 karakter olmalıdır")
    .max(80, "Ad Soyad en fazla 80 karakter olabilir"),
  phone: z
    .string()
    .min(10, "Telefon numarası en az 10 karakter olmalıdır")
    .max(20, "Telefon numarası en fazla 20 karakter olabilir")
    .regex(
      /^[+]?[\d\s()-]{10,20}$/,
      "Geçerli bir telefon numarası girin (örn: 0533 123 45 67)"
    ),
  email: z
    .email("Geçerli bir e-posta adresi girin"),
  message: z
    .string()
    .min(10, "Mesaj en az 10 karakter olmalıdır")
    .max(500, "Mesaj en fazla 500 karakter olabilir"),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof contactSchema> | '_form', string>>;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState(""); // Anti-spam honeypot
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const result = contactSchema.safeParse(formData);
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors: FieldErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof typeof fieldErrors;
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    setErrors(fieldErrors);
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: eğer bu alan doluysa bot'tur, sessizce başarılı göster
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
      setErrors({ _form: 'İletişim formu kurulumu eksik (Google Sheets URL bulunamadı). Lütfen telefonla ulaşın.' });
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

      // CORS Preflight sorunu yaşamamak için 'no-cors' kullanıyoruz
      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        body: formDataToSend,
      });

      // no-cors 'opaque' (okunamaz) yanıt döner, fetch hata fırlatmadığı için başarılı kabul ediyoruz
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", phone: "", email: "", message: "" });
        setErrors({});
      }, 2500);
    } catch {
      setIsSubmitting(false);
      setErrors({ _form: 'Sunucuya ulaşılamadı. Lütfen internet bağlantınızı kontrol edin.' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Yazarken alan hatasını temizle
    if (errors[name as keyof FieldErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  return (
    <div className="rounded-2xl p-6 lg:p-8 border border-foreground/10 bg-foreground/5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      {isSubmitted ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-light text-foreground mb-2">Teşekkürler!</h3>
          <p className="text-muted-foreground">Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Honeypot — botlar doldurur, gerçek kullanıcılar görmez */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div>
            <Label htmlFor="name" className="text-foreground font-medium">Ad Soyad</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength={80}
              className={`mt-2 h-12 rounded-xl bg-foreground/5 border-border focus:border-accent focus:ring-accent/20 ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Adınız ve soyadınız"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.name}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="phone" className="text-foreground font-medium">Telefon</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              maxLength={20}
              className={`mt-2 h-12 rounded-xl bg-foreground/5 border-border focus:border-accent focus:ring-accent/20 ${errors.phone ? 'border-red-500' : ''}`}
              placeholder="0533 123 45 67"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.phone}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="text-foreground font-medium">E‑posta</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`mt-2 h-12 rounded-xl bg-foreground/5 border-border focus:border-accent focus:ring-accent/20 ${errors.email ? 'border-red-500' : ''}`}
              placeholder="E‑posta adresiniz"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.email}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="message" className="text-foreground font-medium">Mesaj</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              maxLength={500}
              className={`mt-2 rounded-xl bg-foreground/5 border-border focus:border-accent focus:ring-accent/20 resize-none ${errors.message ? 'border-red-500' : ''}`}
              placeholder="Projeniz hakkında detayları paylaşın..."
            />
            <div className="mt-1 flex items-center justify-between">
              {errors.message ? (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.message}
                </p>
              ) : <span />}
              <span className="text-xs text-muted-foreground">{formData.message.length}/500</span>
            </div>
          </div>

          {errors._form && (
            <p className="text-sm text-red-500 flex items-center gap-1 p-3 bg-red-50 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" /> {errors._form}
            </p>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full bg-accent hover:bg-accent/90 text-white h-12 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50">
            {isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
            {!isSubmitting && <Send className="ml-2 h-5 w-5" />}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
