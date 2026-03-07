"use client";

import React, { useState } from "react";

interface PricingPlan {
  name: string;
  monthlyPrice: string; // Separate price for monthly
  annualPriceMonthly: string; // Annual total divided by 12
  period: string;
  annualLabel: string; // The "Save 20%" text
  features: string[];
  disabledFeatures?: string[];
  buttonText: string;
  isPopular?: boolean;
}

const PricingSection: React.FC = () => {
  // State for the toggle
  const [isAnnual, setIsAnnual] = useState(false);

  const plans: PricingPlan[] = [
    {
      name: "SOLO",
      monthlyPrice: "$29",
      annualPriceMonthly: "$23", // ~278 / 12
      period: "per month",
      annualLabel: "$278 billed annually",
      features: ["365 AI posts/year", "1 brand", "Email support"],
      disabledFeatures: ["No reels", "ShoutlyAI watermark"],
      buttonText: "START SOLO →",
    },
    {
      name: "CREATOR",
      monthlyPrice: "$79",
      annualPriceMonthly: "$63", // ~758 / 12
      period: "per month",
      annualLabel: "$758 billed annually",
      features: [
        "Unlimited posts",
        "12 reels/month",
        "1 brand",
        "No watermark",
        "Priority support",
      ],
      buttonText: "START CREATOR →",
    },
    {
      name: "BUSINESS",
      monthlyPrice: "$197",
      annualPriceMonthly: "$157", // ~1891 / 12
      period: "per month",
      annualLabel: "$1,891 billed annually",
      features: [
        "Unlimited posts",
        "Unlimited reels",
        "3 brands",
        "Premium branding",
        "Priority support",
      ],
      isPopular: true,
      buttonText: "START BUSINESS →",
    },
    {
      name: "GROWTH",
      monthlyPrice: "$497",
      annualPriceMonthly: "$397", // ~4771 / 12
      period: "per month",
      annualLabel: "$4,771 billed annually",
      features: [
        "Unlimited posts",
        "Unlimited reels",
        "10 brands",
        "White-label option",
        "API access",
      ],
      buttonText: "CONTACT SALES",
    },
  ];

  const addOns = [
    "Extra brand: $29/mo",
    "White-label: $197/mo",
    "API access: $497/mo",
    "Custom AI training: $997 one-time",
  ];

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-xs font-bold tracking-widest mb-6 uppercase">
            💰 INVESTMENT — REPLACE $5K AGENCY
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-10">
            ONE PRICE.{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              365 DAYS.
            </span>
          </h2>

          {/* TOGGLE SWITCH */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-sm font-bold ${!isAnnual ? "text-slate-900" : "text-slate-400"}`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-16 h-8 rounded-full bg-slate-200 p-1 transition-colors hover:bg-slate-300"
            >
              <div
                className={`w-6 h-6 bg-orange-500 rounded-full shadow-md transition-transform duration-300 transform ${isAnnual ? "translate-x-8" : "translate-x-0"}`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-bold ${isAnnual ? "text-slate-900" : "text-slate-400"}`}
              >
                Annual
              </span>
              <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-3xl border transition-all duration-500 flex flex-col ${
                plan.isPopular
                  ? "border-orange-500 bg-white shadow-[0_20px_50px_rgba(249,115,22,0.15)] ring-1 ring-orange-500 scale-105 z-10"
                  : "border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xl"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-black px-4 py-1 rounded-full tracking-widest uppercase shadow-lg">
                  🔥 MOST POPULAR
                </div>
              )}

              <div className="text-slate-500 font-bold text-sm mb-4 tracking-widest uppercase">
                {plan.name}
              </div>

              {/* DYNAMIC PRICE */}
              <div className="flex flex-col mb-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-slate-900 transition-all">
                    {isAnnual ? plan.annualPriceMonthly : plan.monthlyPrice}
                  </span>

                  {/* SHOW STRIKETHROUGH AND SAVINGS WHEN ANNUAL IS ACTIVE */}
                  {isAnnual && (
                    <div className="flex flex-col">
                      <span className="text-lg text-slate-400 line-through font-bold leading-none">
                        {plan.monthlyPrice}
                      </span>
                      <span className="text-[10px] text-green-600 font-black uppercase tracking-tighter bg-green-50 px-1 rounded">
                        Save {(parseInt(plan.monthlyPrice.replace('$', '')) - parseInt(plan.annualPriceMonthly.replace('$', '')))}/mo
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-xs text-slate-400 uppercase tracking-widest mb-6 font-semibold">
                {plan.period}
              </div>

              {/* DYNAMIC SUB-LABEL */}
              <div
                className={`text-xs p-3 rounded-xl mb-8 text-center font-bold transition-all ${
                  plan.isPopular
                    ? "bg-orange-500 text-white"
                    : "bg-white text-slate-600 border border-slate-200 shadow-sm"
                }`}
              >
                {isAnnual ? plan.annualLabel : "Billed monthly"}
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="text-sm flex items-start text-slate-700 font-medium"
                  >
                    <span className="mr-3 text-orange-500 font-bold">✓</span>
                    {feature}
                  </li>
                ))}
                {plan.disabledFeatures?.map((feature, i) => (
                  <li
                    key={i}
                    className="text-sm flex items-start text-slate-400"
                  >
                    <span className="mr-3 opacity-50 font-bold">✗</span>
                    <span className="opacity-70">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-black text-sm transition-all tracking-tight active:scale-95 ${
                  plan.isPopular
                    ? "bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-200"
                    : "bg-slate-900 hover:bg-black text-white"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="flex flex-wrap justify-center gap-3 mt-16">
          {addOns.map((addon, i) => (
            <span
              key={i}
              className="px-5 py-2 bg-slate-100 border border-slate-200 rounded-full text-[11px] font-bold text-slate-500 hover:bg-white hover:border-orange-300 transition-all cursor-default"
            >
              {addon}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
