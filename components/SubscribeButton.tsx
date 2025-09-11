"use client";

import { useState } from "react";

interface Props {
  priceId: string;
  userEmail: string;
}

export default function SubscribeButton({ priceId, userEmail }: Props) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      body: JSON.stringify({ priceId, userEmail }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    setLoading(false);
  };

  return (
    <button onClick={handleCheckout} disabled={loading}>
      {loading ? "Redirecting..." : "Subscribe"}
    </button>
  );
}
