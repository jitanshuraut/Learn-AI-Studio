"use client";
import React, { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";

function CreditPage() {
    const session: any = useCurrentUser();
    const [credit, setCredit] = useState<number | null>(null);
    const [lastCreditDate, setLastCreditDate] = useState<string | null>(null);
    const [nextCreditDate, setNextCreditDate] = useState<string | null>(null);

    useEffect(() => {
        if (!session?.id) return;
        const fetchCredit = async () => {
            try {
                const res = await fetch("/api/getCredit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: session.id }),
                });
                const data = await res.json();
                setCredit(data.Credit);
                if (data.LastCreditUpdate) {
                    const last = new Date(data.LastCreditUpdate);
                    setLastCreditDate(last.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }));
                    const next = new Date(last.getTime() + 7 * 24 * 60 * 60 * 1000);
                    setNextCreditDate(next.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }));
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchCredit();
    }, [session?.id]);

    if (credit === null) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-white/50 text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-10 py-16 px-4">
            {/* Credit Balance */}
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-12 w-full max-w-sm text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#8678F9]/10 to-transparent pointer-events-none" />
                <p className="relative text-white/40 text-xs uppercase tracking-[0.2em] mb-4">Available Credits</p>
                <p className="relative text-7xl font-extrabold text-[#8678F9] tabular-nums">{credit}</p>
            </div>

            {/* Date Cards */}
            <div className="flex flex-row gap-6 w-full max-w-sm">
                <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 text-center">
                    <p className="text-white/40 text-xs uppercase tracking-[0.15em] mb-3">Last Credited</p>
                    <p className="text-white text-base font-semibold">{lastCreditDate ?? "—"}</p>
                </div>
                <div className="flex-1 rounded-2xl border border-[#8678F9]/20 bg-[#8678F9]/[0.04] backdrop-blur-md p-6 text-center">
                    <p className="text-white/40 text-xs uppercase tracking-[0.15em] mb-3">Next Credit</p>
                    <p className="text-[#8678F9] text-base font-semibold">{nextCreditDate ?? "—"}</p>
                </div>
            </div>

            <p className="text-white/25 text-xs tracking-wide">You receive 5 credits every 7 days</p>
        </div>
    );
}

export default CreditPage;
