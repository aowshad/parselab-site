import { signals } from '@/content/signals';
import Counter from './Counter';

/**
 * Company scale as editorial figures, not a stats strip. The first signal
 * is given more room than the rest; the row is deliberately uneven.
 */
export default function Signals() {
  const [lead, ...rest] = signals;

  return (
    <div className="grid-12 gap-y-12">
      <div className="col-span-4 md:col-span-5">
        <p className="wdth-tight text-hero leading-[0.85]">
          <Counter to={lead.value} suffix={lead.suffix} />
        </p>
        <p className="meta mt-4 max-w-[18ch]">{lead.label}</p>
      </div>

      <dl className="col-span-4 grid grid-cols-2 gap-x-6 gap-y-10 self-end md:col-span-6 md:col-start-7 md:grid-cols-2">
        {rest.map((s) => (
          <div key={s.label} className="border-t border-rule pt-4">
            <dd className="wdth-tight text-display leading-[0.9]">
              <Counter to={s.value} suffix={s.suffix} />
            </dd>
            <dt className="meta mt-3 max-w-[18ch]">{s.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}
