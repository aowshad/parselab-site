import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArrowLink from '@/components/ArrowLink';
import MagneticButton from '@/components/MagneticButton';
import Placeholder from '@/components/Placeholder';
import SectionLabel from '@/components/SectionLabel';
import { roles, hiringProcess } from '@/content/careers';

export function generateStaticParams() {
  return roles.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const role = roles.find((r) => r.slug === slug);
  return { title: role?.needsContent ? 'Open role' : role?.title ?? 'Open role' };
}

export default async function RoleDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const role = roles.find((r) => r.slug === slug);
  if (!role) notFound();

  return (
    <>
      <section className="shell pb-12 pt-[calc(var(--nav-h)+7rem)]">
        <Link href="/careers" className="meta group inline-flex items-center gap-2 text-accent-ink">
          <span aria-hidden className="transition-transform duration-fast group-hover:-translate-x-1">←</span>
          All roles
        </Link>
        <h1 className="mt-10 text-hero wdth-tight">
          {role.needsContent ? <Placeholder label="[ADD ROLE]" /> : role.title}
        </h1>
        <dl className="mt-10 grid-12 gap-y-6 border-t border-rule pt-6">
          {[
            { k: 'Team', v: role.department },
            { k: 'Location', v: role.location },
            { k: 'Type', v: role.type },
          ].map((f) => (
            <div key={f.k} className="col-span-2 md:col-span-3">
              <dt className="meta">{f.k}</dt>
              <dd className="mt-2 wdth-narrow text-[1.05rem]">{f.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="shell pt-10">
        <div className="grid-12 gap-y-10">
          <SectionLabel className="col-span-4 md:col-span-3">The role</SectionLabel>
          <div className="col-span-4 md:col-span-7">
            {role.summary ? (
              <p className="text-lead text-ink-soft">{role.summary}</p>
            ) : (
              <Placeholder label="[ADD ROLE DESCRIPTION]" />
            )}

            {['responsibilities', 'requirements'].map((key) => {
              const list = role[key as 'responsibilities' | 'requirements'];
              return (
                <div key={key} className="mt-12">
                  <p className="meta mb-4">{key === 'responsibilities' ? 'What you would do' : 'What we are looking for'}</p>
                  {list?.length ? (
                    <ul className="space-y-3">
                      {list.map((item) => (
                        <li key={item} className="flex gap-4 border-t border-rule pt-3 text-ink-soft">
                          <span aria-hidden className="mt-3 block h-px w-4 shrink-0 bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Placeholder label={`[ADD ${key.toUpperCase()}]`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">What happens next</SectionLabel>
          <ol className="col-span-4 md:col-span-9">
            {hiringProcess.map((s, i) => (
              <li key={s.step} className="flex gap-6 border-t border-rule py-5 first:border-t-0 first:pt-0">
                <span className="meta tnum pt-1 text-accent">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="wdth-narrow text-[1.05rem]">{s.step}</h2>
                  <p className="mt-1 max-w-measure text-ink-soft">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell py-section">
        <div className="flex flex-wrap items-center gap-8">
          <MagneticButton href="/contact">Apply for this role</MagneticButton>
          <ArrowLink href="/careers">See other roles</ArrowLink>
        </div>
      </section>
    </>
  );
}
