"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Formspree ile gönder
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formDataToSend,
      });
      
      if (!res.ok) {
        alert('Gönderim başarısız');
        setIsSubmitting(false);
        return;
      }
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", phone: "", email: "", message: "" });
      }, 2500);
    } catch {
      setIsSubmitting(false);
      alert('Sunucuya ulaşılamadı');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-foreground font-medium">Ad Soyad</Label>
            <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required maxLength={80} className="mt-2 h-12 rounded-xl bg-foreground/5 border-border focus:border-accent focus:ring-accent/20" placeholder="Adınız ve soyadınız" />
          </div>

          <div>
            <Label htmlFor="phone" className="text-foreground font-medium">Telefon</Label>
            <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required className="mt-2 h-12 rounded-xl bg-foreground/5 border-border focus:border-accent focus:ring-accent/20" placeholder="Telefon numaranız" />
          </div>

          <div>
            <Label htmlFor="email" className="text-foreground font-medium">E‑posta</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="mt-2 h-12 rounded-xl bg-foreground/5 border-border focus:border-accent focus:ring-accent/20" placeholder="E‑posta adresiniz" />
          </div>

          <div>
            <Label htmlFor="message" className="text-foreground font-medium">Mesaj</Label>
            <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} maxLength={500} className="mt-2 rounded-xl bg-foreground/5 border-border focus:border-accent focus:ring-accent/20 resize-none" placeholder="Projeniz hakkında detayları paylaşın..." />
          </div>

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
