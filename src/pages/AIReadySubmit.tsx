import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Plus, Trash2, Upload, X } from 'lucide-react';
import { submitProfile } from '../lib/api';
import type { Credential, Degree, ProfileSubmission } from '../types';
import Button from '../components/ui/Button';

declare global {
  interface Window {
    turnstile?: {
      render: (
        selector: string | HTMLElement,
        opts: { sitekey: string; callback: (token: string) => void; 'error-callback'?: () => void; 'expired-callback'?: () => void; theme?: string },
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? '';
const MAX_CREDENTIALS = 12;
const MAX_HEADSHOT_BYTES = 2 * 1024 * 1024;

const emptyCredential = (): Credential => ({ issuer: '', title: '', verifyUrl: '', badgeImageUrl: '', issuedDate: '' });
const emptyDegree = (): Degree => ({ degree: '', institution: '', year: new Date().getFullYear(), focus: '' });

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function AIReadySubmit() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Clarksville, TN');
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [headshotBase64, setHeadshotBase64] = useState<string | null>(null);
  const [headshotError, setHeadshotError] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<Credential[]>([emptyCredential()]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const turnstileContainer = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    const existing = document.querySelector<HTMLScriptElement>('script[data-turnstile]');
    if (!existing) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.dataset.turnstile = 'true';
      document.head.appendChild(script);
    }

    const renderWidget = () => {
      if (!window.turnstile || !turnstileContainer.current) return false;
      if (turnstileWidgetId.current) return true;
      turnstileWidgetId.current = window.turnstile.render(turnstileContainer.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(null),
        'error-callback': () => setTurnstileToken(null),
      });
      return true;
    };

    if (!renderWidget()) {
      const interval = window.setInterval(() => {
        if (renderWidget()) window.clearInterval(interval);
      }, 250);
      return () => window.clearInterval(interval);
    }
  }, []);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_HEADSHOT_BYTES) {
      setHeadshotError('Headshot must be under 2MB.');
      return;
    }
    if (!file.type.startsWith('image/')) {
      setHeadshotError('File must be an image.');
      return;
    }
    setHeadshotError(null);
    const reader = new FileReader();
    reader.onload = () => setHeadshotBase64(typeof reader.result === 'string' ? reader.result : null);
    reader.readAsDataURL(file);
  };

  const updateCredential = (index: number, patch: Partial<Credential>) => {
    setCredentials((prev) => prev.map((c, i) => (i === index ? { ...c, ...patch } : c)));
  };
  const addCredential = () => setCredentials((prev) => (prev.length < MAX_CREDENTIALS ? [...prev, emptyCredential()] : prev));
  const removeCredential = (index: number) => setCredentials((prev) => prev.filter((_, i) => i !== index));

  const updateDegree = (index: number, patch: Partial<Degree>) => {
    setDegrees((prev) => prev.map((d, i) => (i === index ? { ...d, ...patch } : d)));
  };
  const addDegree = () => setDegrees((prev) => [...prev, emptyDegree()]);
  const removeDegree = (index: number) => setDegrees((prev) => prev.filter((_, i) => i !== index));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!turnstileToken) {
      setErrorMessage('Please complete the verification challenge before submitting.');
      return;
    }

    const cleanCredentials = credentials
      .map((c) => ({ ...c, issuer: c.issuer.trim(), title: c.title.trim(), verifyUrl: c.verifyUrl.trim() }))
      .filter((c) => c.issuer && c.title && c.verifyUrl);

    const cleanDegrees = degrees
      .map((d) => ({ ...d, degree: d.degree.trim(), institution: d.institution.trim(), focus: d.focus?.trim() }))
      .filter((d) => d.degree && d.institution && d.year);

    const payload: ProfileSubmission = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      city: city.trim() || undefined,
      headline: headline.trim() || undefined,
      bio: bio.trim() || undefined,
      linkedinUrl: linkedinUrl.trim() || undefined,
      headshotBase64: headshotBase64 ?? undefined,
      credentials: cleanCredentials,
      degrees: cleanDegrees,
      turnstileToken,
    };

    setStatus('submitting');
    try {
      await submitProfile(payload);
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Submission failed.');
      if (window.turnstile && turnstileWidgetId.current) {
        window.turnstile.reset(turnstileWidgetId.current);
        setTurnstileToken(null);
      }
    }
  };

  if (status === 'success') {
    return (
      <section className="pt-28 md:pt-36 pb-24 md:pb-32 bg-gradient-to-b from-river-blue-50 to-cloud-white min-h-[70vh]">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto text-center bg-white rounded-2xl border border-river-blue/8 shadow-elevation-2 p-8 md:p-12"
          >
            <CheckCircle className="w-12 h-12 text-fort-green mx-auto mb-4" />
            <h1 className="text-3xl font-serif font-bold text-river-blue mb-3">Profile submitted</h1>
            <p className="text-historic-stone mb-6">
              Thanks for joining AI-Ready Clarksville. Our team will review your profile and publish
              it within a few business days. We'll reach out at {email || 'your email'} if anything
              needs clarification.
            </p>
            <Button href="/ai-ready">Back to Directory</Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-cloud-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <header className="mb-8 text-center">
            <span className="text-sm font-medium text-sunset-copper tracking-wider uppercase">Join the Directory</span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-river-blue mt-2 mb-3">Add Your AI-Ready Profile</h1>
            <p className="text-historic-stone">
              Share who you are and the credentials you've earned. Submissions are reviewed before
              they appear on the public directory. Your email and phone stay private.
            </p>
          </header>

          <form onSubmit={onSubmit} className="space-y-8 bg-white rounded-2xl border border-river-blue/8 shadow-elevation-1 p-6 md:p-8">
            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-river-blue uppercase tracking-wider mb-2">About You</legend>
              <Field label="Full name" required>
                <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
              </Field>
              <Field label="Email" required hint="Private — never displayed on public profile.">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
              </Field>
              <Field label="Phone" hint="Optional. Private.">
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
              </Field>
              <Field label="City / area">
                <input value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} />
              </Field>
              <Field label="Headline" hint="e.g., Solutions Architect, Student at APSU, Founder at Altivum.">
                <input value={headline} onChange={(e) => setHeadline(e.target.value)} className={inputClass} maxLength={120} />
              </Field>
              <Field label="Short bio" hint={`${bio.length}/300 characters.`}>
                <textarea value={bio} onChange={(e) => setBio(e.target.value.slice(0, 300))} rows={3} className={inputClass} />
              </Field>
              <Field label="LinkedIn URL">
                <input type="url" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} placeholder="https://linkedin.com/in/..." className={inputClass} />
              </Field>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-river-blue uppercase tracking-wider mb-3">Headshot</legend>
              <p className="text-xs text-historic-stone mb-3">JPG or PNG, under 2MB. Square preferred.</p>
              <div className="flex items-center gap-4">
                {headshotBase64 ? (
                  <div className="relative">
                    <img src={headshotBase64} alt="Headshot preview" className="w-20 h-20 rounded-full object-cover border border-river-blue/10" />
                    <button
                      type="button"
                      onClick={() => setHeadshotBase64(null)}
                      className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white border border-river-blue/20 text-historic-stone hover:text-river-blue shadow-elevation-1 flex items-center justify-center"
                      aria-label="Remove headshot"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-river-blue/20 flex items-center justify-center text-river-blue/40">
                    <Upload className="w-6 h-6" />
                  </div>
                )}
                <label className="inline-flex items-center px-4 py-2 bg-river-blue/5 hover:bg-river-blue/10 text-river-blue text-sm font-medium rounded-lg cursor-pointer transition-colors">
                  <input type="file" accept="image/*" onChange={onFileChange} className="hidden" />
                  Upload headshot
                </label>
              </div>
              {headshotError && <p className="text-xs text-red-600 mt-2">{headshotError}</p>}
            </fieldset>

            <fieldset>
              <div className="flex items-center justify-between mb-3">
                <legend className="text-sm font-semibold text-river-blue uppercase tracking-wider">Credentials</legend>
                {credentials.length < MAX_CREDENTIALS && (
                  <button type="button" onClick={addCredential} className="text-xs font-medium text-sunset-copper hover:text-sunset-copper-dark inline-flex items-center gap-1">
                    <Plus className="w-3 h-3" />
                    Add
                  </button>
                )}
              </div>
              <p className="text-xs text-historic-stone mb-4">
                Each credential needs a verify URL (Credly, Anthropic Academy, Coursera certificate, etc). Up to {MAX_CREDENTIALS}.
              </p>
              <div className="space-y-4">
                {credentials.map((cred, i) => (
                  <div key={i} className="border border-river-blue/10 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-river-blue">Credential {i + 1}</span>
                      {credentials.length > 1 && (
                        <button type="button" onClick={() => removeCredential(i)} className="text-historic-stone/60 hover:text-red-600" aria-label="Remove credential">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Field label="Issuer" small>
                        <input value={cred.issuer} onChange={(e) => updateCredential(i, { issuer: e.target.value })} placeholder="AWS, Anthropic, Microsoft..." className={inputClass} />
                      </Field>
                      <Field label="Title" small>
                        <input value={cred.title} onChange={(e) => updateCredential(i, { title: e.target.value })} placeholder="AI Practitioner" className={inputClass} />
                      </Field>
                    </div>
                    <Field label="Verify URL" small hint="Required for credential to be accepted.">
                      <input type="url" value={cred.verifyUrl} onChange={(e) => updateCredential(i, { verifyUrl: e.target.value })} placeholder="https://credly.com/badges/..." className={inputClass} />
                    </Field>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Field label="Badge image URL" small hint="Optional — Credly badge image URL.">
                        <input type="url" value={cred.badgeImageUrl ?? ''} onChange={(e) => updateCredential(i, { badgeImageUrl: e.target.value })} placeholder="https://images.credly.com/..." className={inputClass} />
                      </Field>
                      <Field label="Issued" small hint="Optional, e.g., 2025-06.">
                        <input value={cred.issuedDate ?? ''} onChange={(e) => updateCredential(i, { issuedDate: e.target.value })} placeholder="2025-06" className={inputClass} />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <div className="flex items-center justify-between mb-3">
                <legend className="text-sm font-semibold text-river-blue uppercase tracking-wider">Education</legend>
                <button type="button" onClick={addDegree} className="text-xs font-medium text-sunset-copper hover:text-sunset-copper-dark inline-flex items-center gap-1">
                  <Plus className="w-3 h-3" />
                  Add
                </button>
              </div>
              <p className="text-xs text-historic-stone mb-4">Optional. Include degrees with an AI/tech focus.</p>
              <div className="space-y-4">
                {degrees.map((deg, i) => (
                  <div key={i} className="border border-river-blue/10 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-river-blue">Degree {i + 1}</span>
                      <button type="button" onClick={() => removeDegree(i)} className="text-historic-stone/60 hover:text-red-600" aria-label="Remove degree">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Field label="Degree" small>
                        <input value={deg.degree} onChange={(e) => updateDegree(i, { degree: e.target.value })} placeholder="BS, MS, PhD..." className={inputClass} />
                      </Field>
                      <Field label="Institution" small>
                        <input value={deg.institution} onChange={(e) => updateDegree(i, { institution: e.target.value })} placeholder="Austin Peay State University" className={inputClass} />
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Field label="Focus" small hint="e.g., Computer Science, focus in ML.">
                        <input value={deg.focus ?? ''} onChange={(e) => updateDegree(i, { focus: e.target.value })} className={inputClass} />
                      </Field>
                      <Field label="Year" small>
                        <input type="number" min={1950} max={2100} value={deg.year} onChange={(e) => updateDegree(i, { year: Number(e.target.value) })} className={inputClass} />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-river-blue uppercase tracking-wider mb-3">Verification</legend>
              <div ref={turnstileContainer} className="min-h-[65px]" />
              {!TURNSTILE_SITE_KEY && (
                <p className="text-xs text-red-600 mt-2">
                  Turnstile site key not configured. Set <code>VITE_TURNSTILE_SITE_KEY</code> before deploying.
                </p>
              )}
            </fieldset>

            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
                {errorMessage}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Submitting...' : 'Submit for Review'}
              </Button>
              <Button variant="outline" href="/ai-ready">Cancel</Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

const inputClass =
  'w-full px-3 py-2 bg-white border border-river-blue/15 rounded-lg text-sm text-river-blue placeholder:text-river-blue/30 focus:outline-none focus:ring-2 focus:ring-sunset-copper/30 focus:border-sunset-copper transition-colors';

function Field({
  label,
  children,
  hint,
  required,
  small,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
  required?: boolean;
  small?: boolean;
}) {
  return (
    <label className="block">
      <span className={`block ${small ? 'text-xs' : 'text-sm'} font-medium text-river-blue mb-1`}>
        {label}
        {required && <span className="text-sunset-copper ml-0.5">*</span>}
      </span>
      {children}
      {hint && <span className="block text-[11px] text-historic-stone/70 mt-1">{hint}</span>}
    </label>
  );
}
