import React, { useState, useMemo, useRef } from "react";
import { Calculator, ArrowRight, ArrowLeft, Info, AlertTriangle, CheckCircle2, Wallet, Landmark, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface FormState {
  // Step 1: Assets
  goldValue: string;
  silverValue: string;
  cashInHand: string;
  foreignCurrency: string;
  bankBalance: string;
  savingsCertificates: string;
  insurancePremium: string;
  providentFund: string;
  loanReceivable: string;
  depositedMoney: string;
  securityMoney: string;
  otherSecurity: string;
  businessCash: string;
  businessReceivable: string;
  businessStock: string;
  businessAssetsForSale: string;
  ventureCapital: string;
  investmentCapital: string;
  stockMarketCapitalGain: string;
  stockMarketDividend: string;
  stockMarketDividendMarketValue: string;

  // Step 2: Liabilities
  shortTermDebts: string;
  utilityBills: string;
  unpaidSalaries: string;
  unpaidTaxes: string;
  otherLiabilities: string;
}

const initialFormState: FormState = {
  goldValue: "",
  silverValue: "",
  cashInHand: "",
  foreignCurrency: "",
  bankBalance: "",
  savingsCertificates: "",
  insurancePremium: "",
  providentFund: "",
  loanReceivable: "",
  depositedMoney: "",
  securityMoney: "",
  otherSecurity: "",
  businessCash: "",
  businessReceivable: "",
  businessStock: "",
  businessAssetsForSale: "",
  ventureCapital: "",
  investmentCapital: "",
  stockMarketCapitalGain: "",
  stockMarketDividend: "",
  stockMarketDividendMarketValue: "",
  shortTermDebts: "",
  utilityBills: "",
  unpaidSalaries: "",
  unpaidTaxes: "",
  otherLiabilities: "",
};

const ZakatCalculator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const formRef = useRef<HTMLDivElement>(null);

  const NISAB_VALUE = 228375;
  const LAST_UPDATED = "২৮/০২/২০২৬";

  const handleInputChange = (field: keyof FormState, value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const totals = useMemo(() => {
    const assets = [
      formData.goldValue, formData.silverValue, formData.cashInHand, formData.foreignCurrency,
      formData.bankBalance, formData.savingsCertificates, formData.insurancePremium, formData.providentFund,
      formData.loanReceivable, formData.depositedMoney, formData.securityMoney, formData.otherSecurity,
      formData.businessCash, formData.businessReceivable, formData.businessStock, formData.businessAssetsForSale,
      formData.ventureCapital, formData.investmentCapital, formData.stockMarketCapitalGain,
      formData.stockMarketDividend, formData.stockMarketDividendMarketValue
    ].reduce((sum, val) => sum + (parseFloat(val) || 0), 0);

    const liabilities = [
      formData.shortTermDebts, formData.utilityBills, formData.unpaidSalaries,
      formData.unpaidTaxes, formData.otherLiabilities
    ].reduce((sum, val) => sum + (parseFloat(val) || 0), 0);

    const netAssets = Math.max(0, assets - liabilities);
    const zakatDue = netAssets >= NISAB_VALUE ? netAssets * 0.025 : 0;

    return { assets, liabilities, netAssets, zakatDue };
  }, [formData]);

  const formatter = new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const changeStep = (newStep: number) => {
    setIsFormVisible(false);
    setTimeout(() => {
      setStep(newStep);
      setIsFormVisible(true);
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  };

  const renderInputField = (id: keyof FormState, label: string, index: number) => (
    <div
      className="space-y-1.5 md:space-y-2 group animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
    >
      <Label htmlFor={id} className="text-[12px] md:text-[13px] font-medium text-brand-100/70 group-focus-within:text-gold-400 transition-colors block leading-snug">
        {label}
      </Label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/50 font-medium select-none text-sm">
          ৳
        </div>
        <Input
          id={id}
          type="text"
          inputMode="decimal"
          value={formData[id]}
          onChange={(e) => handleInputChange(id, e.target.value)}
          className="w-full bg-brand-950/20 border-brand-50/5 rounded-xl h-10 md:h-11 pl-9 pr-4 text-brand-50 focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/30 transition-all border group-hover:border-brand-50/10 text-sm md:text-base"
          placeholder="০"
        />
      </div>
    </div>
  );

  return (
    <section id="zakat" className="py-12 md:py-24 border-t border-brand-50/5 relative overflow-hidden bg-brand-950">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 blur-[120px] -z-10 rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-500/5 blur-[120px] -z-10 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 animate-fade-in px-2">
          <h2 className="text-2xl md:text-5xl font-serif font-bold text-brand-50 inline-block pb-1 md:pb-2 tracking-tight">
            জাকাত ক্যালকুলেটর
          </h2>
          <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-2 md:mt-4 rounded-full opacity-60"></div>
          <p className="mt-4 md:mt-6 text-brand-100/50 max-w-2xl mx-auto font-light text-xs md:text-base leading-relaxed">
            আপনার সম্পদের সঠিক হিসাব করে জাকাত প্রদানের মাধ্যমে তা পবিত্র করুন। আস-সুন্নাহ ফাউন্ডেশনের মানদণ্ড অনুযায়ী পরিমার্জিত।
          </p>
        </div>

        <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 items-start">
          {/* Main Calculator Area */}
          <div className="lg:col-span-8 space-y-6">
            <div className="glass-card-dark rounded-[2rem] border border-brand-50/10 shadow-2xl relative overflow-hidden flex flex-col transition-all duration-500 hover:shadow-gold-500/5">

              {/* Stepper Header */}
              <div className="p-5 sm:p-8 border-b border-brand-50/5 bg-brand-900/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gold-500/10 rounded-xl md:rounded-2xl flex items-center justify-center border border-gold-500/20 shadow-inner">
                      <Calculator className="w-5 h-5 md:w-6 md:h-6 text-gold-400" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-base md:text-xl text-brand-50">হিসাব প্রক্রিয়া</h3>
                      <p className="text-[9px] md:text-[10px] text-gold-500/50 uppercase tracking-[0.2em] mt-0.5 font-bold">Step {step} of 2</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {[1, 2].map((s) => (
                      <div key={s} className="flex flex-col items-center gap-2">
                        <div
                          className={`h-2 w-14 sm:w-16 rounded-full transition-all duration-700 ${step >= s ? "bg-gold-500 shadow-[0_0_12px_rgba(212,175,55,0.5)]" : "bg-brand-50/10"
                            }`}
                        ></div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${step === s ? "text-gold-400" : "text-brand-100/30"
                          }`}>
                          {s === 1 ? "Assets" : "Liabilities"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gold-400/90 font-medium">
                  {step === 1 ? (
                    <div className="flex items-center gap-2 animate-fade-in">
                      <Wallet className="w-5 h-5 text-gold-500" />
                      <span className="text-base md:text-lg">ধাপ ১: জাকাতযোগ্য সম্পদ</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 animate-fade-in">
                      <Landmark className="w-5 h-5 text-gold-500" />
                      <span className="text-base md:text-lg">ধাপ ২: দায়-দেনা (ঋণ)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Content */}
              <div className={`p-5 sm:p-8 transition-all duration-300 ${isFormVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                {step === 1 ? (
                  <div className="space-y-10">
                    {/* Group: Cash & Jewelry */}
                    <div className="space-y-5">
                      <div className="flex items-center gap-2 border-l-2 border-gold-500/40 pl-3">
                        <h4 className="text-[11px] font-bold text-gold-500/60 uppercase tracking-[0.15em]">নগদ ও অলংকার</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        {renderInputField("goldValue", "১। স্বর্ণের বর্তমান বিক্রয় মূল্য", 1)}
                        {renderInputField("silverValue", "২। রৌপ্যের বর্তমান বিক্রয় মূল্য", 2)}
                        {renderInputField("cashInHand", "৩। নিজের কাছে থাকা নগদ অর্থ", 3)}
                        {renderInputField("foreignCurrency", "৪। বৈদেশিক মুদ্রার বিক্রয় মূল্য", 4)}
                      </div>
                    </div>

                    {/* Group: Banking */}
                    <div className="space-y-5">
                      <div className="flex items-center gap-2 border-l-2 border-gold-500/40 pl-3">
                        <h4 className="text-[11px] font-bold text-gold-500/60 uppercase tracking-[0.15em]">ব্যাংক ও সঞ্চয়</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        {renderInputField("bankBalance", "৫। জমাকৃত অর্থ (ব্যাংক একাউন্ট)", 5)}
                        {renderInputField("savingsCertificates", "৬। সঞ্চয়পত্র/বন্ড/ট্রেজারি বিল", 6)}
                        {renderInputField("insurancePremium", "৭। বীমা পলিসিতে জমাকৃত অর্থ", 7)}
                        {renderInputField("providentFund", "৮। ঐচ্ছিক প্রভিডেন্ট ফান্ড", 8)}
                      </div>
                    </div>

                    {/* Group: Business */}
                    <div className="space-y-5">
                      <div className="flex items-center gap-2 border-l-2 border-gold-500/40 pl-3">
                        <h4 className="text-[11px] font-bold text-gold-500/60 uppercase tracking-[0.15em]">ব্যবসা ও বিনিয়োগ</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        {renderInputField("businessCash", "৯। ব্যবসার নগদ টাকা", 9)}
                        {renderInputField("businessReceivable", "১০। ব্যবসার বকেয়া পাওনা", 10)}
                        {renderInputField("businessStock", "১১। স্টকে থাকা মালের পাইকারি মূল্য", 11)}
                        {renderInputField("businessAssetsForSale", "১২। বিনিয়োগকৃত সম্পদের বিক্রয় মূল্য", 12)}
                        {renderInputField("ventureCapital", "১৩। পার্টনারশিপ ব্যবসায় অংশ", 13)}
                        {renderInputField("investmentCapital", "১৪। ব্যবসায় বিনিয়োগকৃত মূল টাকা", 14)}
                        {renderInputField("stockMarketCapitalGain", "১৫। শেয়ারের বাজারমূল্য (বিক্রয়যোগ্য)", 15)}
                        {renderInputField("stockMarketDividend", "১৬। ডিভিডেন্ড ভিত্তিক শেয়ারের অংশ", 16)}
                      </div>
                    </div>

                    {/* Group: Others */}
                    <div className="space-y-5">
                      <div className="flex items-center gap-2 border-l-2 border-gold-500/40 pl-3">
                        <h4 className="text-[11px] font-bold text-gold-500/60 uppercase tracking-[0.15em]">অন্যান্য সম্পদ</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        {renderInputField("loanReceivable", "১৭। ফেরতযোগ্য ঋণের পাওনা অর্থ", 17)}
                        {renderInputField("depositedMoney", "১৮। কারো কাছে রাখা আমানত", 18)}
                        {renderInputField("securityMoney", "১৯। ভাড়া সিকিউরিটি মানি", 19)}
                        {renderInputField("otherSecurity", "২০। অন্যান্য জামানতের অর্থ", 20)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8 animate-fade-in">
                    <div className="p-4 bg-red-500/5 rounded-2xl border border-red-500/10 flex gap-4">
                      <Info className="w-5 h-5 text-red-500/60 shrink-0 mt-0.5" />
                      <p className="text-sm text-brand-100/60 leading-relaxed italic font-light">
                        শুধুমাত্র পরিশোধযোগ্য বর্তমান ঋণের কিস্তি বা চলতি দায়সমূহ এখানে প্রদান করুন। ১০ বছরের দীর্ঘমেয়াদী ঋণের সম্পূর্ণ অংশ বাদ দেওয়া যাবে না।
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderInputField("shortTermDebts", "১। ব্যক্তিগত স্বল্পমেয়াদী ঋণ", 1)}
                      {renderInputField("utilityBills", "২। বকেয়া বিল (গ্যাস, বিদ্যুৎ, ইত্যাদি)", 2)}
                      {renderInputField("unpaidSalaries", "৩। বকেয়া বেতন ও মজুরি", 3)}
                      {renderInputField("unpaidTaxes", "৪। বকেয়া সরকারি ট্যাক্স/খাজনা", 4)}
                      {renderInputField("otherLiabilities", "৫। অন্যান্য ব্যবসায়িক দায়সমূহ", 5)}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Footer */}
              <div className="p-5 md:p-8 border-t border-brand-50/5 bg-brand-900/10 flex flex-col sm:flex-row gap-3 sm:justify-between items-center">
                <div className="flex gap-3 w-full sm:w-auto order-2 sm:order-1">
                  {step === 2 && (
                    <Button
                      onClick={() => changeStep(1)}
                      variant="outline"
                      className="flex-1 sm:flex-none border-brand-50/10 text-brand-100 hover:bg-brand-50/5 rounded-xl px-4 md:px-6 h-11 md:h-12"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" /> ফিরে যান
                    </Button>
                  )}
                  <Button
                    onClick={() => setFormData(initialFormState)}
                    variant="ghost"
                    className="flex-1 sm:flex-none text-brand-100/40 hover:text-red-400 hover:bg-red-400/5 h-11 md:h-12 rounded-xl text-[13px] md:text-sm"
                  >
                    সব মুছুন
                  </Button>
                </div>

                {step === 1 ? (
                  <Button
                    onClick={() => changeStep(2)}
                    className="w-full sm:w-auto order-1 sm:order-2 bg-gold-500 text-brand-950 font-bold px-8 md:px-10 rounded-xl hover:bg-gold-400 group h-11 md:h-12 shadow-lg shadow-gold-500/20"
                  >
                    পরবর্তী ধাপ <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      const element = document.getElementById('zakat-result');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto order-1 sm:order-2 bg-green-600 text-white font-bold px-8 md:px-10 rounded-xl hover:bg-green-500 h-11 md:h-12 shadow-lg shadow-green-600/20 uppercase tracking-wide text-xs md:text-sm"
                  >
                    হিসাব দেখুন <ChevronUp className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>

            {/* Warning Section */}
            <div className="glass-card-dark rounded-xl md:rounded-2xl p-4 md:p-6 border border-red-500/10 bg-red-500/5 animate-fade-in group">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-red-500 group-hover:scale-110 transition-transform" />
                <h5 className="font-bold text-red-400 text-sm md:text-lg">জরুরি সতর্কবার্তা:</h5>
              </div>
              <p className="text-[11px] md:text-[13px] text-brand-100/50 leading-relaxed md:leading-loose text-justify font-light">
                এই ডিজিটাল ক্যালকুলেটরটি শুধুমাত্র আপনাকে একটি প্রাথমিক ধারণা প্রদানের জন্য তৈরি করা হয়েছে। যাকাত একটি ফরয ইবাদত, তাই সূক্ষ্ম হিসাবের জন্য আপনার নিকটস্থ নির্ভরযোগ্য অভিজ্ঞ মুফতি বা আলেমের পরামর্শ গ্রহণ করা একান্ত কাম্য। তথ্যের ভুল ইনপুটের জন্য ভুল হিসাব আসলে আস-সুন্নাহ ফাউন্ডেশন বা ডেভেলপার টিম দায়ী থাকবে না।
              </p>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24" id="zakat-result">
            {/* Net Result Card */}
            <div className="glass-card-dark rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border border-gold-500/30 bg-gradient-to-br from-brand-900/40 via-brand-950/20 to-brand-900/40 shadow-2xl relative overflow-hidden group animate-fade-in">
              <div className="absolute inset-0 bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 text-center">
                <p className="text-gold-500/50 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-2 md:mb-3">সম্ভাব্য জাকাত</p>
                <div className="text-4xl md:text-6xl font-black text-gold-400 mb-4 md:mb-6 drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)] font-sans tracking-tighter">
                  ৳{formatter.format(totals.zakatDue)}
                </div>

                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  <div className="flex justify-between items-center text-[11px] md:text-xs py-2 md:py-3 border-b border-brand-50/5">
                    <span className="text-brand-100/40 font-medium">মোট সম্পদ</span>
                    <span className="text-brand-50 font-bold bg-brand-50/5 px-3 py-1 rounded-full">৳{formatter.format(totals.assets)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] md:text-xs py-2 md:py-3 border-b border-brand-50/5">
                    <span className="text-brand-100/40 font-medium">মোট দায় (ঋণ)</span>
                    <span className="text-red-400/80 font-bold bg-red-400/5 px-3 py-1 rounded-full">- ৳{formatter.format(totals.liabilities)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] md:text-xs py-3 md:py-4">
                    <span className="text-gold-500 font-bold uppercase tracking-wider">নিট সম্পদ</span>
                    <span className="text-brand-50 text-sm md:text-base font-black tracking-tight">৳{formatter.format(totals.netAssets)}</span>
                  </div>
                </div>

                {totals.netAssets > 0 && totals.netAssets < NISAB_VALUE ? (
                  <div className="mt-4 p-4 bg-orange-500/5 rounded-2xl border border-orange-500/10 text-[11px] text-orange-200/50 leading-relaxed animate-pulse">
                    আপনার নিট সম্পদ বর্তমানে নিসাব (৳২,২৮,৩৭৫) এর নিচে রয়েছে। এ অবস্থায় যাকাত ফরজ হয় না।
                  </div>
                ) : totals.zakatDue > 0 ? (
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-center gap-2 p-3 bg-green-500/10 rounded-2xl border border-green-500/20 text-green-400">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span className="text-[11px] font-bold uppercase tracking-widest">যাকাত ফরজ হওয়ার সম্ভাবনা আছে</span>
                    </div>
                    <Button
                      onClick={() => window.open('https://assunnahfoundation.org/donation/zakat', '_blank')}
                      className="w-full bg-gold-500 hover:bg-gold-400 text-brand-950 font-bold rounded-xl h-11 transition-all"
                    >
                      যাকাত প্রদান করুন
                    </Button>
                  </div>
                ) : (
                  <div className="mt-4 p-4 bg-brand-50/5 rounded-2xl border border-brand-50/5 text-[11px] text-brand-100/30 leading-relaxed font-light">
                    সম্পদের পরিমাণ নিসাবের উপরে গেলে ২.৫% হারে যাকাত প্রদান করতে হবে।
                  </div>
                )}
              </div>
            </div>

            {/* Nisab Info Card */}
            <div className="glass-card-dark rounded-[2rem] p-6 border border-brand-50/5 bg-brand-900/5 hover:border-gold-500/20 transition-colors duration-500 group animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center justify-between mb-6">
                <h5 className="font-serif font-bold text-brand-50 text-lg flex items-center gap-2">
                  <Info className="w-5 h-5 text-gold-500" /> নিসাব তথ্য
                </h5>
                <span className="px-2 py-0.5 bg-gold-500/10 text-gold-500 text-[9px] font-bold rounded-full border border-gold-500/20">SILVER BASIS</span>
              </div>

              <div className="space-y-4">
                <div className="bg-brand-950/40 rounded-2xl p-4 border border-brand-50/5 group-hover:bg-brand-950/60 transition-colors">
                  <div className="text-3xl font-black text-gold-400 font-sans tracking-tight mb-1">৳ ২,২৮,৩৭৫</div>
                  <div className="text-[10px] text-brand-100/30 uppercase tracking-[0.1em] font-medium leading-relaxed">
                    ৫২.৫ তোলা রুপার বর্তমান বাজারমূল্য অনুযায়ী সর্বনিম্ন নিসাব
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-brand-100/40 border-t border-brand-50/5 pt-4">
                  <span className="font-medium">সর্বশেষ হালনাগাদ</span>
                  <span className="text-gold-500/60 font-bold">{LAST_UPDATED}</span>
                </div>
              </div>
            </div>

            {/* Privacy Promise */}
            <div className="p-4 rounded-xl border border-brand-50/5 bg-brand-50/5 text-center flex items-center justify-center gap-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-[10px] text-brand-100/30 uppercase tracking-[0.15em] font-bold">
                Data is completely private & never stored
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Summary Bar */}
      {totals.assets > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-[100] lg:hidden animate-fade-in-up">
          <div className="glass-card-dark border border-gold-500/30 h-16 rounded-2xl flex items-center justify-between px-5 shadow-2xl backdrop-blur-3xl bg-brand-950/80">
            <div className="flex flex-col">
              <span className="text-[10px] text-gold-500/60 font-bold uppercase tracking-[0.1em]">Your Zakat</span>
              <span className="text-xl font-bold text-brand-50 tracking-tight font-sans">৳{formatter.format(totals.zakatDue)}</span>
            </div>
            <Button
              onClick={() => {
                const element = document.getElementById('zakat-result');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              size="sm"
              className="bg-gold-500 text-brand-950 rounded-xl font-bold h-10 px-4 shadow-lg shadow-gold-500/20 active:scale-95 transition-transform"
            >
              Breakdown
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ZakatCalculator;
