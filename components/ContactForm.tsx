'use client';

import { useState } from 'react';
import { company } from '@/content/site';

type Field = 'name' | 'email' | 'org' | 'reason' | 'message';
type Errors = Partial<Record<Field, string>>;

const REASONS = ['General', 'Sales', 'Partnerships', 'Careers'];

/**
 * Five fields, nothing optional dressed up as required. Validation runs on
 * submit and again on change once a field has errored, so the form never
 * scolds you mid-sentence.
 *
 * No endpoint is wired: submitting opens a pre-filled mail draft. To POST
 * instead, add a route at /api/contact and set ENDPOINT below.
 */
const ENDPOINT: string | null = null;

export default function ContactForm() {
  const [values, setValues] = useState<Record<Field, string>>({
    name: '', email: '', org: '', reason: REASONS[0], message: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [sending, setSending] = useState(false);

  const validate = (v: typeof values): Errors => {
    const e: Errors = {};
    if (!v.name.trim()) e.name = 'Tell us who you are.';
    if (!v.email.trim()) e.email = 'We need an address to reply to.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) e.email = 'That address looks incomplete.';
    if (!v.message.trim()) e.message = 'A sentence is enough.';
    else if (v.message.trim().length < 10) e.message = 'A little more context helps.';
    return e;
  };

  const set = (f: Field) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...values, [f]: ev.target.value };
    setValues(next);
    if (touched) setErrors(validate(next));
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setTouched(true);
    const e = validate(values);
    setErrors(e);
    if (Object.keys(e).length) {
      document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    setSending(true);
    if (ENDPOINT) {
      await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
    } else {
      const body = `${values.message}\n\n— ${values.name}${values.org ? `, ${values.org}` : ''}\n${values.email}`;
      window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
        `${values.reason} enquiry`,
      )}&body=${encodeURIComponent(body)}`;
    }
    setSending(false);
  };

  const field = 'w-full border-b border-rule bg-transparent py-3 text-[1.05rem] outline-none transition-colors duration-fast placeholder:text-ink-muted focus:border-accent';

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-measure-wide">
      <div className="space-y-8">
        {([
          { id: 'name' as Field, label: 'Your name', type: 'text', ph: '' },
          { id: 'email' as Field, label: 'Work email', type: 'email', ph: '' },
          { id: 'org' as Field, label: 'Company (optional)', type: 'text', ph: '' },
        ]).map((f) => (
          <div key={f.id}>
            <label htmlFor={f.id} className="meta mb-2 block">{f.label}</label>
            <input
              id={f.id}
              name={f.id}
              type={f.type}
              value={values[f.id]}
              onChange={set(f.id)}
              aria-invalid={Boolean(errors[f.id])}
              aria-describedby={errors[f.id] ? `${f.id}-error` : undefined}
              className={`${field} ${errors[f.id] ? 'border-accent' : ''}`}
            />
            {errors[f.id] && (
              <p id={`${f.id}-error`} className="meta mt-2 text-accent-ink">{errors[f.id]}</p>
            )}
          </div>
        ))}

        <div>
          <label htmlFor="reason" className="meta mb-2 block">Reason for contacting</label>
          <select id="reason" name="reason" value={values.reason} onChange={set('reason')} className={field}>
            {REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="meta mb-2 block">Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={set('message')}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`${field} resize-y ${errors.message ? 'border-accent' : ''}`}
          />
          {errors.message && <p id="message-error" className="meta mt-2 text-accent-ink">{errors.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="group mt-10 inline-flex min-h-[48px] items-center gap-3 bg-ink px-6 text-nav wdth-narrow text-paper transition-colors duration-fast hover:bg-accent disabled:opacity-60"
      >
        {sending ? 'Sending' : 'Send message'}
        <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">→</span>
      </button>
    </form>
  );
}
