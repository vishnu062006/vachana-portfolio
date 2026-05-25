'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { Mail, Phone, Send, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/social-icons';
import { personalInfo } from '@/data/portfolio';
import type { ContactFormData } from '@/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SectionReveal } from '@/components/SectionReveal';
import { cn } from '@/lib/utils';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

const socialIconMap: Record<string, typeof GithubIcon> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
};

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    reset();
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const Wrapper = prefersReducedMotion ? 'div' : motion.div;
  const wrapperProps = prefersReducedMotion
    ? {}
    : {
        variants: containerVariants,
        initial: 'hidden',
        animate: isInView ? 'visible' : 'hidden',
      };
  const ItemWrapper = prefersReducedMotion ? 'div' : motion.div;
  const itemProps = prefersReducedMotion ? {} : { variants: itemVariants };

  return (
    <SectionReveal>
      <section
        id="contact"
        className="relative py-24 sm:py-32"
        ref={sectionRef}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Wrapper {...wrapperProps}>
            {/* Section heading */}
            <ItemWrapper {...itemProps} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Get in Touch
                </span>
              </h2>
              <div className="mt-4 h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-purple-600" />
              <p className="mt-4 text-gray-400 max-w-md mx-auto">
                Have a project in mind or just want to say hi? I&apos;d love to
                hear from you.
              </p>
            </ItemWrapper>

            {/* Two-column layout */}
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Form — left (3 cols) */}
              <ItemWrapper {...itemProps} className="lg:col-span-3">
                <div
                  className={cn(
                    'rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md',
                    'p-6 sm:p-8',
                  )}
                >
                  {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <CheckCircle2 className="w-16 h-16 text-green-400 mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-gray-400">
                        Thank you for reaching out. I&apos;ll get back to you
                        soon!
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-5"
                      noValidate
                    >
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-sm font-medium text-gray-300 mb-1.5"
                        >
                          Name
                        </label>
                        <Input
                          id="contact-name"
                          placeholder="Your name"
                          {...register('name')}
                          aria-invalid={errors.name ? 'true' : 'false'}
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-xs text-red-400">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-sm font-medium text-gray-300 mb-1.5"
                        >
                          Email
                        </label>
                        <Input
                          id="contact-email"
                          type="email"
                          placeholder="you@example.com"
                          {...register('email')}
                          aria-invalid={errors.email ? 'true' : 'false'}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs text-red-400">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* Subject */}
                      <div>
                        <label
                          htmlFor="contact-subject"
                          className="block text-sm font-medium text-gray-300 mb-1.5"
                        >
                          Subject
                        </label>
                        <Input
                          id="contact-subject"
                          placeholder="What's this about?"
                          {...register('subject')}
                          aria-invalid={errors.subject ? 'true' : 'false'}
                        />
                        {errors.subject && (
                          <p className="mt-1.5 text-xs text-red-400">
                            {errors.subject.message}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="contact-message"
                          className="block text-sm font-medium text-gray-300 mb-1.5"
                        >
                          Message
                        </label>
                        <Textarea
                          id="contact-message"
                          placeholder="Tell me about your project..."
                          {...register('message')}
                          aria-invalid={errors.message ? 'true' : 'false'}
                        />
                        {errors.message && (
                          <p className="mt-1.5 text-xs text-red-400">
                            {errors.message.message}
                          </p>
                        )}
                      </div>

                      {/* Submit */}
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            Send Message
                          </span>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </ItemWrapper>

              {/* Contact info — right (2 cols) */}
              <ItemWrapper {...itemProps} className="lg:col-span-2">
                <div className="space-y-6">
                  {/* Email */}
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className={cn(
                      'group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md',
                      'p-5 transition-all duration-500',
                      'hover:border-cyan-400/20 hover:bg-white/[0.06]',
                      'hover:shadow-lg hover:shadow-cyan-500/5',
                    )}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-purple-600/30 transition-all duration-300">
                      <Mail className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white font-medium">
                        {personalInfo.email}
                      </p>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href={`tel:+91${personalInfo.phone}`}
                    className={cn(
                      'group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md',
                      'p-5 transition-all duration-500',
                      'hover:border-cyan-400/20 hover:bg-white/[0.06]',
                      'hover:shadow-lg hover:shadow-cyan-500/5',
                    )}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-purple-600/30 transition-all duration-300">
                      <Phone className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="text-white font-medium">
                        +91 {personalInfo.phone}
                      </p>
                    </div>
                  </a>

                  {/* Socials */}
                  <div className="pt-4">
                    <p className="text-sm text-gray-400 mb-3">
                      Find me online
                    </p>
                    <div className="flex items-center gap-3">
                      {personalInfo.socials.map((social) => {
                        const Icon = socialIconMap[social.icon];
                        if (!Icon) return null;
                        return (
                          <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.name}
                            className={cn(
                              'flex items-center justify-center w-12 h-12 rounded-xl',
                              'border border-white/10 bg-white/5 backdrop-blur-sm',
                              'text-gray-400 transition-all duration-300',
                              'hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-white/10',
                              'hover:shadow-lg hover:shadow-cyan-500/10',
                            )}
                          >
                            <Icon className="w-5 h-5" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </ItemWrapper>
            </div>
          </Wrapper>
        </div>
      </section>
    </SectionReveal>
  );
}
