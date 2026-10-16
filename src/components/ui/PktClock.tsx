"use client";

import React, { useEffect, useState } from "react";

export const PktClock: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>("05:34:22 PM");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      setTimeStr(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span suppressHydrationWarning>{timeStr}</span>;
};
