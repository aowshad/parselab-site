'use client';

import { useEffect, useState } from 'react';

/** Real information: what time it is where the studio is. */
export default function LocalTime({ timeZone = 'Asia/Dhaka' }: { timeZone?: string }) {
  const [t, setT] = useState<string>('');

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone,
        hour12: false,
      }).format(new Date());
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 30_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return <span className="tnum">{t || '--:--'}</span>;
}
