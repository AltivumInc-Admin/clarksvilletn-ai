import { useEffect, useMemo, useState } from 'react';
import { Authenticator, ThemeProvider, type Theme } from '@aws-amplify/ui-react';
import type { AuthUser } from 'aws-amplify/auth';
import '@aws-amplify/ui-react/styles.css';
import { motion } from 'framer-motion';
import { Check, CheckCircle, Loader2, LogOut, Plus, Trash2, Upload, X } from 'lucide-react';
import { ApiError, getMyProfile, putMyProfile } from '../lib/api';
import type { Credential, Degree } from '../types';
import Button from '../components/ui/Button';
import { cognitoConfigured } from '../lib/amplify';

const MAX_CREDENTIALS = 12;
const MAX_HEADSHOT_BYTES = 2 * 1024 * 1024;
const MAX_BADGE_BYTES = 200 * 1024;

type BadgeMode = 'url' | 'upload';
type CredentialDraft = Credential & { badgeMode?: BadgeMode; badgeError?: string };

const emptyCredential = (): CredentialDraft => ({
  issuer: '',
  title: '',
  verifyUrl: '',
  badgeImageUrl: '',
  badgeImageBase64: '',
  badgeMode: 'upload',
  issuedDate: '',
});
const emptyDegree = (): Degree => ({
  degree: '',
  institution: '',
  year: new Date().getFullYear(),
  focus: '',
});

type Status = 'idle' | 'submitting' | 'success' | 'error';

const authTheme: Theme = {
  name: 'clarksville',
  tokens: {
    colors: {
      brand: {
        primary: {
          10: { value: '#eef2f7' },
          20: { value: '#cfd9e6' },
          40: { value: '#7a93b2' },
          60: { value: '#3f5f85' },
          80: { value: '#1e3a5f' },
          90: { value: '#162d4a' },
          100: { value: '#0f2239' },
        },
      },
      font: {
        interactive: { value: '{colors.brand.primary.80}' },
      },
      border: {
        focus: { value: '{colors.brand.primary.80}' },
      },
    },
    components: {
      authenticator: {
        router: {
          borderColor: { value: '{colors.neutral.20}' },
          boxShadow: { value: '0 10px 30px -15px rgba(30, 58, 95, 0.25)' },
        },
      },
      tabs: {
        item: {
          _active: {
            color: { value: '{colors.brand.primary.80}' },
            borderColor: { value: '{colors.brand.primary.80}' },
          },
          _hover: {
            color: { value: '{colors.brand.primary.90}' },
          },
          _focus: {
            color: { value: '{colors.brand.primary.80}' },
          },
        },
      },
      button: {
        primary: {
          backgroundColor: { value: '{colors.brand.primary.80}' },
          _hover: { backgroundColor: { value: '{colors.brand.primary.90}' } },
          _focus: { backgroundColor: { value: '{colors.brand.primary.90}' } },
          _active: { backgroundColor: { value: '{colors.brand.primary.100}' } },
        },
        link: {
          color: { value: '{colors.brand.primary.80}' },
          _hover: { color: { value: '{colors.brand.primary.90}' } },
          _focus: { color: { value: '{colors.brand.primary.90}' } },
        },
      },
      fieldcontrol: {
        _focus: {
          borderColor: { value: '{colors.brand.primary.80}' },
          boxShadow: { value: '0 0 0 1px {colors.brand.primary.80}' },
        },
      },
    },
  },
};

export default function AIReadySubmit() {
  if (!cognitoConfigured) {
    return <ConfigurationMissing />;
  }
  return (
    <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-cloud-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <ThemeProvider theme={authTheme}>
            <Authenticator
              components={{
                SignUp: {
                  FormFields() {
                    return (
                      <>
                        <Authenticator.SignUp.FormFields />
                        <PasswordRequirements />
                      </>
                    );
                  },
                },
                ForceNewPassword: {
                  FormFields() {
                    return (
                      <>
                        <Authenticator.ForceNewPassword.FormFields />
                        <PasswordRequirements />
                      </>
                    );
                  },
                },
                ConfirmResetPassword: {
                  Footer() {
                    return <PasswordRequirements />;
                  },
                },
              }}
            >
              {({ signOut, user }) => (
                <ProfileForm signOut={signOut ?? (() => undefined)} user={user} />
              )}
            </Authenticator>
          </ThemeProvider>
        </div>
      </div>
    </section>
  );
}

function PasswordRequirements() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  useEffect(() => {
    const attach = () => {
      const pw = document.querySelector<HTMLInputElement>('input[name="password"]');
      const cp = document.querySelector<HTMLInputElement>('input[name="confirm_password"]');
      if (!pw || !cp) return false;
      const handlePw = (e: Event) => setPassword((e.target as HTMLInputElement).value);
      const handleCp = (e: Event) => setConfirm((e.target as HTMLInputElement).value);
      pw.addEventListener('input', handlePw);
      cp.addEventListener('input', handleCp);
      setPassword(pw.value);
      setConfirm(cp.value);
      cleanup = () => {
        pw.removeEventListener('input', handlePw);
        cp.removeEventListener('input', handleCp);
      };
      return true;
    };
    let cleanup: (() => void) | undefined;
    if (!attach()) {
      const raf = requestAnimationFrame(() => attach());
      return () => {
        cancelAnimationFrame(raf);
        cleanup?.();
      };
    }
    return () => cleanup?.();
  }, []);

  const checks = useMemo(
    () => [
      { label: 'At least 10 characters', pass: password.length >= 10 },
      { label: 'Contains an uppercase letter', pass: /[A-Z]/.test(password) },
      { label: 'Contains a lowercase letter', pass: /[a-z]/.test(password) },
      { label: 'Contains a number', pass: /[0-9]/.test(password) },
      {
        label: 'Contains a symbol (e.g. ! @ # $ %)',
        pass: /[\^$*.[\]{}()?"!@#%&/\\,><':;|_~`+=\-\s]/.test(password),
      },
      {
        label: 'Passwords match',
        pass: password.length > 0 && password === confirm,
      },
    ],
    [password, confirm],
  );

  return (
    <ul className="mt-1 mb-2 space-y-1 text-xs">
      {checks.map((c) => (
        <li key={c.label} className="flex items-center gap-2">
          {c.pass ? (
            <Check className="w-3.5 h-3.5 text-fort-green shrink-0" />
          ) : (
            <X className="w-3.5 h-3.5 text-red-500 shrink-0" />
          )}
          <span className={c.pass ? 'text-fort-green' : 'text-historic-stone'}>{c.label}</span>
        </li>
      ))}
    </ul>
  );
}

function ConfigurationMissing() {
  return (
    <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-cloud-white min-h-[70vh]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-river-blue/8 shadow-elevation-1 p-8 text-center">
          <h1 className="text-2xl font-serif font-bold text-river-blue mb-3">
            Sign-in not configured
          </h1>
          <p className="text-sm text-historic-stone">
            This deployment is missing <code>VITE_COGNITO_USER_POOL_ID</code> and
            <code> VITE_COGNITO_USER_POOL_CLIENT_ID</code>. Set them in the Amplify environment
            variables and redeploy.
          </p>
        </div>
      </div>
    </section>
  );
}

function ProfileForm({
  signOut,
  user,
}: {
  signOut: () => void;
  user: AuthUser | undefined;
}) {
  const cognitoEmail = user?.signInDetails?.loginId ?? '';

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [existingStatus, setExistingStatus] = useState<
    'pending' | 'approved' | 'rejected' | null
  >(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Clarksville, TN');
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [existingHeadshotUrl, setExistingHeadshotUrl] = useState<string | null>(null);
  const [headshotBase64, setHeadshotBase64] = useState<string | null>(null);
  const [headshotError, setHeadshotError] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<CredentialDraft[]>([emptyCredential()]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await getMyProfile();
        if (cancelled) return;
        if (res) {
          const p = res.profile;
          setExistingStatus(p.status);
          setName(p.name ?? '');
          setEmail(p.email ?? cognitoEmail);
          setPhone(p.phone ?? '');
          setCity(p.city ?? 'Clarksville, TN');
          setHeadline(p.headline ?? '');
          setBio(p.bio ?? '');
          setLinkedinUrl(p.linkedinUrl ?? '');
          setExistingHeadshotUrl(p.headshotUrl ?? null);
          if (p.credentials?.length) {
            setCredentials(
              p.credentials.map((c) => ({
                ...c,
                badgeMode: c.badgeImageUrl ? 'url' : 'upload',
                badgeImageBase64: '',
              })),
            );
          }
          if (p.degrees?.length) setDegrees(p.degrees);
        } else {
          setEmail(cognitoEmail);
        }
      } catch (err) {
        if (cancelled) return;
        setLoadError(err instanceof Error ? err.message : 'Failed to load profile.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [cognitoEmail]);

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
    reader.onload = () =>
      setHeadshotBase64(typeof reader.result === 'string' ? reader.result : null);
    reader.readAsDataURL(file);
  };

  const updateCredential = (index: number, patch: Partial<CredentialDraft>) => {
    setCredentials((prev) => prev.map((c, i) => (i === index ? { ...c, ...patch } : c)));
  };
  const addCredential = () =>
    setCredentials((prev) =>
      prev.length < MAX_CREDENTIALS ? [...prev, emptyCredential()] : prev,
    );
  const removeCredential = (index: number) =>
    setCredentials((prev) => prev.filter((_, i) => i !== index));

  const onBadgeFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      updateCredential(index, { badgeError: 'File must be an image.' });
      return;
    }
    if (file.size > MAX_BADGE_BYTES) {
      updateCredential(index, { badgeError: 'Badge image must be under 200KB.' });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      updateCredential(index, {
        badgeImageBase64: result,
        badgeImageUrl: '',
        badgeError: undefined,
      });
    };
    reader.readAsDataURL(file);
  };

  const updateDegree = (index: number, patch: Partial<Degree>) => {
    setDegrees((prev) => prev.map((d, i) => (i === index ? { ...d, ...patch } : d)));
  };
  const addDegree = () => setDegrees((prev) => [...prev, emptyDegree()]);
  const removeDegree = (index: number) =>
    setDegrees((prev) => prev.filter((_, i) => i !== index));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanCredentials = credentials
      .filter((c) => c.issuer.trim() && c.title.trim() && c.verifyUrl.trim())
      .map<Credential>((c) => ({
        issuer: c.issuer.trim(),
        title: c.title.trim(),
        verifyUrl: c.verifyUrl.trim(),
        ...(c.badgeImageBase64 ? { badgeImageBase64: c.badgeImageBase64 } : {}),
        ...(c.badgeImageUrl && c.badgeImageUrl.trim()
          ? { badgeImageUrl: c.badgeImageUrl.trim() }
          : {}),
        ...(c.issuedDate && c.issuedDate.trim() ? { issuedDate: c.issuedDate.trim() } : {}),
      }));

    const cleanDegrees = degrees
      .map((d) => ({
        ...d,
        degree: d.degree.trim(),
        institution: d.institution.trim(),
        focus: d.focus?.trim(),
      }))
      .filter((d) => d.degree && d.institution && d.year);

    setStatus('submitting');
    try {
      await putMyProfile({
        name: name.trim(),
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        city: city.trim() || undefined,
        headline: headline.trim() || undefined,
        bio: bio.trim() || undefined,
        linkedinUrl: linkedinUrl.trim() || undefined,
        headshotBase64: headshotBase64 ?? undefined,
        credentials: cleanCredentials,
        degrees: cleanDegrees,
      });
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      if (err instanceof ApiError) {
        setErrorMessage(err.message);
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Save failed. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-river-blue/8 shadow-elevation-1 p-12 text-center">
        <Loader2 className="w-8 h-8 text-river-blue mx-auto animate-spin mb-3" />
        <p className="text-sm text-historic-stone">Loading your profile...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="bg-white rounded-2xl border border-river-blue/8 shadow-elevation-1 p-8 text-center">
        <h1 className="text-2xl font-serif font-bold text-river-blue mb-3">
          Couldn't load your profile
        </h1>
        <p className="text-sm text-historic-stone mb-6">{loadError}</p>
        <Button onClick={() => window.location.reload()}>Try again</Button>
      </div>
    );
  }

  if (status === 'success') {
    const wasUpdate = existingStatus !== null;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center bg-white rounded-2xl border border-river-blue/8 shadow-elevation-2 p-8 md:p-12"
      >
        <CheckCircle className="w-12 h-12 text-fort-green mx-auto mb-4" />
        <h1 className="text-3xl font-serif font-bold text-river-blue mb-3">
          {wasUpdate ? 'Changes saved' : 'Profile submitted'}
        </h1>
        <p className="text-historic-stone mb-6">
          {wasUpdate
            ? "We'll review your updates and republish within a few business days. The public directory keeps showing your current approved profile until then."
            : "Thanks for joining AI-Ready Clarksville. Our team will review your profile and publish it within a few business days."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/ai-ready">Back to Directory</Button>
          <Button variant="outline" onClick={() => setStatus('idle')}>
            Keep Editing
          </Button>
        </div>
      </motion.div>
    );
  }

  const isEditing = existingStatus !== null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <div className="text-xs text-historic-stone">
          Signed in as <span className="font-medium text-river-blue">{cognitoEmail}</span>
        </div>
        <button
          type="button"
          onClick={() => signOut()}
          className="inline-flex items-center gap-1.5 text-xs text-historic-stone hover:text-river-blue transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign out
        </button>
      </div>

      <header className="mb-8 text-center">
        <span className="text-sm font-medium text-sunset-copper tracking-wider uppercase">
          {isEditing ? 'Your Profile' : 'Join the Directory'}
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-river-blue mt-2 mb-3">
          {isEditing ? 'Edit Your AI-Ready Profile' : 'Add Your AI-Ready Profile'}
        </h1>
        <p className="text-historic-stone">
          {isEditing ? (
            <>
              Your profile is currently{' '}
              <span className="font-medium text-river-blue">{existingStatus}</span>. Any edits go
              back through moderation before republishing.
            </>
          ) : (
            <>
              Share who you are and the credentials you've earned. Submissions are reviewed before
              they appear on the public directory.
            </>
          )}
        </p>
      </header>

      <form
        onSubmit={onSubmit}
        className="space-y-8 bg-white rounded-2xl border border-river-blue/8 shadow-elevation-1 p-6 md:p-8"
      >
        <fieldset className="space-y-4">
          <legend className="text-sm font-semibold text-river-blue uppercase tracking-wider mb-2">
            About You
          </legend>
          <Field label="Full name" required>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Contact email" hint="Private. Defaults to your sign-in email.">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Phone" hint="Optional. Private.">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="City / area">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field
            label="Headline"
            hint="e.g., Solutions Architect, Student at APSU, Founder at Altivum."
          >
            <input
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className={inputClass}
              maxLength={120}
            />
          </Field>
          <Field label="Short bio" hint={`${bio.length}/300 characters.`}>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 300))}
              rows={3}
              className={inputClass}
            />
          </Field>
          <Field label="LinkedIn URL">
            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/in/..."
              className={inputClass}
            />
          </Field>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-river-blue uppercase tracking-wider mb-3">
            Headshot
          </legend>
          <p className="text-xs text-historic-stone mb-3">
            JPG or PNG, under 2MB. Square preferred.
          </p>
          <div className="flex items-center gap-4">
            {headshotBase64 ? (
              <div className="relative">
                <img
                  src={headshotBase64}
                  alt="Headshot preview"
                  className="w-20 h-20 rounded-full object-cover border border-river-blue/10"
                />
                <button
                  type="button"
                  onClick={() => setHeadshotBase64(null)}
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white border border-river-blue/20 text-historic-stone hover:text-river-blue shadow-elevation-1 flex items-center justify-center"
                  aria-label="Remove new headshot"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : existingHeadshotUrl ? (
              <img
                src={existingHeadshotUrl}
                alt="Current headshot"
                className="w-20 h-20 rounded-full object-cover border border-river-blue/10"
              />
            ) : (
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-river-blue/20 flex items-center justify-center text-river-blue/40">
                <Upload className="w-6 h-6" />
              </div>
            )}
            <label className="inline-flex items-center px-4 py-2 bg-river-blue/5 hover:bg-river-blue/10 text-river-blue text-sm font-medium rounded-lg cursor-pointer transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="hidden"
              />
              {existingHeadshotUrl || headshotBase64 ? 'Replace headshot' : 'Upload headshot'}
            </label>
          </div>
          {headshotError && <p className="text-xs text-red-600 mt-2">{headshotError}</p>}
        </fieldset>

        <fieldset>
          <div className="flex items-center justify-between mb-3">
            <legend className="text-sm font-semibold text-river-blue uppercase tracking-wider">
              Credentials
            </legend>
            {credentials.length < MAX_CREDENTIALS && (
              <button
                type="button"
                onClick={addCredential}
                className="text-xs font-medium text-sunset-copper hover:text-sunset-copper-dark inline-flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                Add
              </button>
            )}
          </div>
          <p className="text-xs text-historic-stone mb-4">
            Each credential needs a verify URL (Credly, Anthropic Academy, Coursera certificate,
            etc.). Upload the badge image or paste a direct URL. Up to {MAX_CREDENTIALS}.
          </p>
          <div className="space-y-4">
            {credentials.map((cred, i) => (
              <div key={i} className="border border-river-blue/10 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-river-blue">Credential {i + 1}</span>
                  {credentials.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCredential(i)}
                      className="text-historic-stone/60 hover:text-red-600"
                      aria-label="Remove credential"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field label="Issuer" small>
                    <input
                      value={cred.issuer}
                      onChange={(e) => updateCredential(i, { issuer: e.target.value })}
                      placeholder="AWS, Anthropic, Microsoft..."
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Title" small>
                    <input
                      value={cred.title}
                      onChange={(e) => updateCredential(i, { title: e.target.value })}
                      placeholder="AI Practitioner"
                      className={inputClass}
                    />
                  </Field>
                </div>
                <Field
                  label="Verify URL"
                  small
                  hint="Required for credential to be accepted."
                >
                  <input
                    type="url"
                    value={cred.verifyUrl}
                    onChange={(e) => updateCredential(i, { verifyUrl: e.target.value })}
                    placeholder="https://credly.com/badges/..."
                    className={inputClass}
                  />
                </Field>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-river-blue">Badge image</span>
                    <div className="inline-flex rounded-md border border-river-blue/15 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => updateCredential(i, { badgeMode: 'upload' })}
                        className={`px-2.5 py-1 text-[11px] font-medium transition-colors ${
                          (cred.badgeMode ?? 'upload') === 'upload'
                            ? 'bg-river-blue text-white'
                            : 'bg-white text-river-blue hover:bg-river-blue/5'
                        }`}
                      >
                        Upload
                      </button>
                      <button
                        type="button"
                        onClick={() => updateCredential(i, { badgeMode: 'url' })}
                        className={`px-2.5 py-1 text-[11px] font-medium border-l border-river-blue/15 transition-colors ${
                          cred.badgeMode === 'url'
                            ? 'bg-river-blue text-white'
                            : 'bg-white text-river-blue hover:bg-river-blue/5'
                        }`}
                      >
                        Image URL
                      </button>
                    </div>
                  </div>
                  {(cred.badgeMode ?? 'upload') === 'upload' ? (
                    <div className="flex items-center gap-3">
                      {cred.badgeImageBase64 ? (
                        <div className="relative">
                          <img
                            src={cred.badgeImageBase64}
                            alt="Badge preview"
                            className="w-14 h-14 rounded-md object-contain border border-river-blue/10 bg-white"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              updateCredential(i, { badgeImageBase64: '', badgeError: undefined })
                            }
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border border-river-blue/20 text-historic-stone hover:text-river-blue shadow-elevation-1 flex items-center justify-center"
                            aria-label="Remove badge image"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      ) : cred.badgeImageUrl ? (
                        <img
                          src={cred.badgeImageUrl}
                          alt="Existing badge"
                          className="w-14 h-14 rounded-md object-contain border border-river-blue/10 bg-white"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-md border-2 border-dashed border-river-blue/20 flex items-center justify-center text-river-blue/40">
                          <Upload className="w-5 h-5" />
                        </div>
                      )}
                      <label className="inline-flex items-center px-3 py-1.5 bg-river-blue/5 hover:bg-river-blue/10 text-river-blue text-xs font-medium rounded-md cursor-pointer transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => onBadgeFileChange(i, e)}
                          className="hidden"
                        />
                        {cred.badgeImageBase64 || cred.badgeImageUrl
                          ? 'Replace image'
                          : 'Upload badge PNG'}
                      </label>
                    </div>
                  ) : (
                    <input
                      type="url"
                      value={cred.badgeImageUrl ?? ''}
                      onChange={(e) =>
                        updateCredential(i, {
                          badgeImageUrl: e.target.value,
                          badgeImageBase64: '',
                        })
                      }
                      placeholder="https://images.credly.com/..."
                      className={inputClass}
                    />
                  )}
                  {cred.badgeError && (
                    <p className="text-[11px] text-red-600 mt-1.5">{cred.badgeError}</p>
                  )}
                  <p className="text-[11px] text-historic-stone/70 mt-1.5">
                    {(cred.badgeMode ?? 'upload') === 'upload'
                      ? 'PNG or JPG, under 200KB. Download the badge from Credly and upload here.'
                      : 'Direct image URL. Leave blank if you only have a verify link.'}
                  </p>
                </div>
                <Field label="Issued" small hint="Optional, e.g., 2025-06.">
                  <input
                    value={cred.issuedDate ?? ''}
                    onChange={(e) => updateCredential(i, { issuedDate: e.target.value })}
                    placeholder="2025-06"
                    className={inputClass}
                  />
                </Field>
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <div className="flex items-center justify-between mb-3">
            <legend className="text-sm font-semibold text-river-blue uppercase tracking-wider">
              Education
            </legend>
            <button
              type="button"
              onClick={addDegree}
              className="text-xs font-medium text-sunset-copper hover:text-sunset-copper-dark inline-flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              Add
            </button>
          </div>
          <p className="text-xs text-historic-stone mb-4">
            Optional. Include degrees with an AI/tech focus.
          </p>
          <div className="space-y-4">
            {degrees.map((deg, i) => (
              <div key={i} className="border border-river-blue/10 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-river-blue">Degree {i + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeDegree(i)}
                    className="text-historic-stone/60 hover:text-red-600"
                    aria-label="Remove degree"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field label="Degree" small>
                    <input
                      value={deg.degree}
                      onChange={(e) => updateDegree(i, { degree: e.target.value })}
                      placeholder="BS, MS, PhD..."
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Institution" small>
                    <input
                      value={deg.institution}
                      onChange={(e) => updateDegree(i, { institution: e.target.value })}
                      placeholder="Austin Peay State University"
                      className={inputClass}
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field label="Focus" small hint="e.g., Computer Science, focus in ML.">
                    <input
                      value={deg.focus ?? ''}
                      onChange={(e) => updateDegree(i, { focus: e.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Year" small>
                    <input
                      type="number"
                      min={1950}
                      max={2100}
                      value={deg.year}
                      onChange={(e) => updateDegree(i, { year: Number(e.target.value) })}
                      className={inputClass}
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        </fieldset>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting'
              ? 'Saving...'
              : isEditing
                ? 'Save Changes'
                : 'Submit for Review'}
          </Button>
          <Button variant="outline" href="/ai-ready">
            Cancel
          </Button>
        </div>
      </form>
    </motion.div>
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
      <span
        className={`block ${small ? 'text-xs' : 'text-sm'} font-medium text-river-blue mb-1`}
      >
        {label}
        {required && <span className="text-sunset-copper ml-0.5">*</span>}
      </span>
      {children}
      {hint && <span className="block text-[11px] text-historic-stone/70 mt-1">{hint}</span>}
    </label>
  );
}
