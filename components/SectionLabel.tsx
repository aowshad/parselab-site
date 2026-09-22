type Props = {
  children: string;
  /** Only pass an index when the content genuinely is a sequence. */
  index?: string;
  className?: string;
};

export default function SectionLabel({ children, index, className = '' }: Props) {
  return (
    <p className={`font-text text-label text-ink-muted flex items-baseline gap-3 ${className}`}>
      {index && <span className="tnum text-accent">{index}</span>}
      <span>{children}</span>
    </p>
  );
}
