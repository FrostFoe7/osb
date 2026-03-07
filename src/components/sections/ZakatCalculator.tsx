import React, { useState, useMemo, useRef } from "react";
import { Calculator, ArrowRight, ArrowLeft, Info, CheckCircle2, Wallet, Landmark, ChevronUp, ChevronDown, Moon, Sun, Gem, Building2, Tractor, Banknote } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface FormState {
  // Step 1: Assets
  goldValue: string;
  silverValue: string;
  preciousItems: string; // Diamonds, Pearls, etc.
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
  realEstateForSale: string; // Land, Flats, etc.
  commercialFarms: string; // Poultry, Fish, Nursery, etc.
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
  preciousItems: "",
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
  realEstateForSale: "",
  commercialFarms: "",
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

interface ZakatCalculatorProps {
  onBack?: () => void;
}

const ZakatCalculator: React.FC<ZakatCalculatorProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isSolarYear, setIsSolarYear] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(["jewelry"]);
  const formRef = useRef<HTMLDivElement>(null);

  const toggleSection = (id: string) => {
    setExpandedSections(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const isExpanded = (id: string) => expandedSections.includes(id);

  const NISAB_VALUE = 228375;
  const LAST_UPDATED = "০৬/০৩/২০২৬";

  const handleInputChange = (field: keyof FormState, value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const totals = useMemo(() => {
    const assets = [
      formData.goldValue, formData.silverValue, formData.preciousItems, formData.cashInHand, formData.foreignCurrency,
      formData.bankBalance, formData.savingsCertificates, formData.insurancePremium, formData.providentFund,
      formData.loanReceivable, formData.depositedMoney, formData.securityMoney, formData.otherSecurity,
      formData.businessCash, formData.businessReceivable, formData.businessStock, formData.businessAssetsForSale,
      formData.realEstateForSale, formData.commercialFarms, formData.ventureCapital, formData.investmentCapital,
      formData.stockMarketCapitalGain, formData.stockMarketDividend, formData.stockMarketDividendMarketValue
    ].reduce((sum, val) => sum + (parseFloat(val) || 0), 0);

    const liabilities = [
      formData.shortTermDebts, formData.utilityBills, formData.unpaidSalaries,
      formData.unpaidTaxes, formData.otherLiabilities
    ].reduce((sum, val) => sum + (parseFloat(val) || 0), 0);

    const netAssets = Math.max(0, assets - liabilities);
    const rate = isSolarYear ? 0.02578 : 0.025;
    const zakatDue = netAssets >= NISAB_VALUE ? netAssets * rate : 0;

    return { assets, liabilities, netAssets, zakatDue, rate };
  }, [formData, isSolarYear]);

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
      <Label htmlFor={id} className="text-[12px] md:text-[13px] font-bold text-brand-100 group-focus-within:text-gold-400 transition-colors block leading-snug">
        {label}
      </Label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500 font-bold select-none text-sm">
          ৳
        </div>
        <Input
          id={id}
          type="text"
          inputMode="decimal"
          value={formData[id]}
          onChange={(e) => handleInputChange(id, e.target.value)}
          className="w-full bg-brand-950/40 border-gold-500/20 rounded-xl h-10 md:h-11 pl-9 pr-4 text-brand-50 focus:ring-1 focus:ring-gold-500 focus:border-gold-500/50 transition-all border group-hover:border-gold-500/40 text-sm md:text-base font-medium"
          placeholder="০"
        />
      </div>
    </div>
  );

  return (
    <section id="zakat" className="py-24 md:py-32 relative overflow-hidden bg-brand-950 min-h-screen">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 blur-[120px] -z-10 rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-500/5 blur-[120px] -z-10 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {onBack && (
          <div className="mb-8 md:mb-12 animate-fade-in">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-brand-100/60 hover:text-gold-400 hover:bg-gold-500/10 flex items-center gap-2 font-bold px-4 py-2 rounded-xl transition-all"
            >
              <ArrowLeft className="w-5 h-5" /> হোম পেজে ফিরে যান
            </Button>
          </div>
        )}
        <div className="text-center mb-10 animate-fade-in px-2">
          <h2 className="text-2xl md:text-5xl font-serif font-bold text-brand-50 inline-block pb-1 md:pb-2 tracking-tight">
            জাকাত ক্যালকুলেটর
          </h2>
          <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-2 md:mt-4 rounded-full opacity-80"></div>
          <p className="mt-4 md:mt-6 text-brand-100/90 max-w-2xl mx-auto font-medium text-xs md:text-base leading-relaxed">
            আপনার সম্পদের সঠিক হিসাব করে জাকাত প্রদানের মাধ্যমে তা পবিত্র করুন। শরিয়াহ ভিত্তিক ও নির্ভরযোগ্য মানদণ্ড অনুযায়ী পরিমার্জিত।
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
                      <h3 className="font-serif font-bold text-base md:text-xl text-brand-50">জাকাতের হিসাব</h3>
                      <p className="text-[9px] md:text-[10px] text-gold-500/50 uppercase tracking-[0.2em] mt-0.5 font-bold">Step {step} of 2</p>
                    </div>
                  </div>

                  {/* Year Type Toggle */}
                  <div className="flex items-center bg-brand-950/40 p-1 rounded-xl border border-brand-50/5">
                    <button
                      onClick={() => setIsSolarYear(false)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${!isSolarYear ? 'bg-gold-500 text-brand-950 shadow-lg' : 'text-brand-100/60 hover:text-brand-100'}`}
                    >
                      <Moon className="w-3.5 h-3.5" /> চন্দ্রবর্ষ
                    </button>
                    <button
                      onClick={() => setIsSolarYear(true)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isSolarYear ? 'bg-gold-500 text-brand-950 shadow-lg' : 'text-brand-100/60 hover:text-brand-100'}`}
                    >
                      <Sun className="w-3.5 h-3.5" /> সৌরবর্ষ
                    </button>
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
                    {/* Group: Jewelry & Valuables */}
                    <div className="space-y-4 md:space-y-5 glass-card-dark/30 rounded-2xl overflow-hidden border border-brand-50/5">
                      <button
                        onClick={() => toggleSection("jewelry")}
                        className="w-full flex items-center justify-between p-4 md:p-5 bg-brand-900/20 hover:bg-brand-900/40 transition-colors border-b border-brand-50/5"
                      >
                        <div className="flex items-center gap-2">
                          <Gem className="w-4 h-4 text-gold-500/60" />
                          <h4 className="text-[11px] font-bold text-gold-500/60 uppercase tracking-[0.15em]">অলংকার ও মূল্যবান সামগ্রী</h4>
                        </div>
                        {isExpanded("jewelry") ? (
                          <ChevronUp className="w-4 h-4 text-gold-500/40" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gold-500/40" />
                        )}
                      </button>

                      {isExpanded("jewelry") && (
                        <div className="p-4 md:p-5 pt-0 md:pt-0 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 animate-fade-in">
                          {renderInputField("goldValue", "১। স্বর্ণের বর্তমান বাজার মূল্য", 1)}
                          {renderInputField("silverValue", "২। রৌপ্যের বর্তমান বাজার মূল্য", 2)}
                          {renderInputField("preciousItems", "৩। হীরা, মণি-মাণিক্য ও মূল্যবান পাথর", 3)}
                        </div>
                      )}
                    </div>

                    {/* Group: Cash & Banking */}
                    <div className="space-y-4 md:space-y-5 glass-card-dark/30 rounded-2xl overflow-hidden border border-brand-50/5">
                      <button
                        onClick={() => toggleSection("cash")}
                        className="w-full flex items-center justify-between p-4 md:p-5 bg-brand-900/20 hover:bg-brand-900/40 transition-colors border-b border-brand-50/5"
                      >
                        <div className="flex items-center gap-2">
                          <Banknote className="w-4 h-4 text-gold-500/60" />
                          <h4 className="text-[11px] font-bold text-gold-500/60 uppercase tracking-[0.15em]">নগদ অর্থ ও ব্যাংক</h4>
                        </div>
                        {isExpanded("cash") ? (
                          <ChevronUp className="w-4 h-4 text-gold-500/40" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gold-500/40" />
                        )}
                      </button>

                      {isExpanded("cash") && (
                        <div className="p-4 md:p-5 pt-0 md:pt-0 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 animate-fade-in">
                          {renderInputField("cashInHand", "৪। নিজের কাছে থাকা নগদ অর্থ", 4)}
                          {renderInputField("foreignCurrency", "৫। বৈদেশিক মুদ্রার বিক্রয় মূল্য", 5)}
                          {renderInputField("bankBalance", "৬। ব্যাংক একাউন্টে জমাকৃত অর্থ", 6)}
                          {renderInputField("savingsCertificates", "৭। সঞ্চয়পত্র/প্রাইজবন্ড/বন্ড/বীমা", 7)}
                          {renderInputField("providentFund", "৮। প্রভিডেন্ট ফান্ড/পেনশন স্কিম", 8)}
                        </div>
                      )}
                    </div>

                    {/* Group: Business & Investment */}
                    <div className="space-y-4 md:space-y-5 glass-card-dark/30 rounded-2xl overflow-hidden border border-brand-50/5">
                      <button
                        onClick={() => toggleSection("business")}
                        className="w-full flex items-center justify-between p-4 md:p-5 bg-brand-900/20 hover:bg-brand-900/40 transition-colors border-b border-brand-50/5"
                      >
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gold-500/60" />
                          <h4 className="text-[11px] font-bold text-gold-500/60 uppercase tracking-[0.15em]">ব্যবসা ও বিনিয়োগ</h4>
                        </div>
                        {isExpanded("business") ? (
                          <ChevronUp className="w-4 h-4 text-gold-500/40" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gold-500/40" />
                        )}
                      </button>

                      {isExpanded("business") && (
                        <div className="p-4 md:p-5 pt-0 md:pt-0 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 animate-fade-in">
                          {renderInputField("businessCash", "৯। ব্যবসার নগদ টাকা", 9)}
                          {renderInputField("businessStock", "১০। ব্যবসার মালের পাইকারি মূল্য", 10)}
                          {renderInputField("stockMarketCapitalGain", "১১। শেয়ারের বাজারমূল্য ও ডিভিডেন্ড", 11)}
                          {renderInputField("investmentCapital", "১২। মূলধনী বিনিয়োগ ও পার্টনারশিপ", 12)}
                        </div>
                      )}
                    </div>

                    {/* Group: Real Estate & Farms */}
                    <div className="space-y-4 md:space-y-5 glass-card-dark/30 rounded-2xl overflow-hidden border border-brand-50/5">
                      <button
                        onClick={() => toggleSection("farms")}
                        className="w-full flex items-center justify-between p-4 md:p-5 bg-brand-900/20 hover:bg-brand-900/40 transition-colors border-b border-brand-50/5"
                      >
                        <div className="flex items-center gap-2">
                          <Tractor className="w-4 h-4 text-gold-500/60" />
                          <h4 className="text-[11px] font-bold text-gold-500/60 uppercase tracking-[0.15em]">জমি ও বাণিজ্যিক খামার</h4>
                        </div>
                        {isExpanded("farms") ? (
                          <ChevronUp className="w-4 h-4 text-gold-500/40" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gold-500/40" />
                        )}
                      </button>

                      {isExpanded("farms") && (
                        <div className="p-4 md:p-5 pt-0 md:pt-0 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 animate-fade-in">
                          {renderInputField("realEstateForSale", "১৩। বিক্রয়ের জন্য রাখা জমি/ফ্ল্যাট", 13)}
                          {renderInputField("commercialFarms", "১৪। বাণিজ্যিক খামার (মাছ/মুরগি/ফল)", 14)}
                        </div>
                      )}
                    </div>

                    {/* Group: Receivables */}
                    <div className="space-y-4 md:space-y-5 glass-card-dark/30 rounded-2xl overflow-hidden border border-brand-50/5">
                      <button
                        onClick={() => toggleSection("receivables")}
                        className="w-full flex items-center justify-between p-4 md:p-5 bg-brand-900/20 hover:bg-brand-900/40 transition-colors border-b border-brand-50/5"
                      >
                        <div className="flex items-center gap-2">
                          <ArrowRight className="w-4 h-4 text-gold-500/60" />
                          <h4 className="text-[11px] font-bold text-gold-500/60 uppercase tracking-[0.15em]">পাওনা অর্থ</h4>
                        </div>
                        {isExpanded("receivables") ? (
                          <ChevronUp className="w-4 h-4 text-gold-500/40" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gold-500/40" />
                        )}
                      </button>

                      {isExpanded("receivables") && (
                        <div className="p-4 md:p-5 pt-0 md:pt-0 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 animate-fade-in">
                          {renderInputField("loanReceivable", "১৫। ফেরতযোগ্য পাওনা ঋণের টাকা", 15)}
                          {renderInputField("depositedMoney", "১৬। কারো কাছে রাখা আমানত/জামানত", 16)}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8 animate-fade-in">
                    <div className="p-4 bg-red-500/5 rounded-2xl border border-red-500/10 flex gap-4">
                      <Info className="w-5 h-5 text-red-500/60 shrink-0 mt-0.5" />
                      <p className="text-sm text-brand-100/60 leading-relaxed italic font-light">
                        শুধুমাত্র তাৎক্ষণিক পরিশোধযোগ্য ঋণ এবং কিস্তিতে পরিশোধযোগ্য ঋণের চলমান কিস্তির পরিমাণ অর্থ এখানে প্রদান করুন।
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderInputField("shortTermDebts", "১। ব্যক্তিগত স্বল্পমেয়াদী ঋণ", 1)}
                      {renderInputField("utilityBills", "২। বকেয়া বিল (গ্যাস, বিদ্যুৎ, ইত্যাদি)", 2)}
                      {renderInputField("unpaidSalaries", "৩। বকেয়া বেতন ও মজুরি", 3)}
                      {renderInputField("unpaidTaxes", "৪। বকেয়া সরকারি ট্যাক্স/খাজনা", 4)}
                      {renderInputField("otherLiabilities", "৫। অন্যান্য ব্যবসায়িক চলতি দায়সমূহ", 5)}
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
                      className="flex-1 sm:flex-none border-gold-500/30 text-brand-50 hover:bg-gold-500/10 rounded-xl px-4 md:px-6 h-11 md:h-12 font-bold"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" /> ফিরে যান
                    </Button>
                  )}
                  <Button
                    onClick={() => setFormData(initialFormState)}
                    variant="ghost"
                    className="flex-1 sm:flex-none text-brand-100/60 hover:text-red-400 hover:bg-red-400/5 h-11 md:h-12 rounded-xl text-[13px] md:text-sm font-bold"
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

            {/* Information Notice Section */}
            <div className="glass-card-dark rounded-xl md:rounded-2xl p-4 md:p-6 border border-gold-500/10 bg-gold-500/5 animate-fade-in group">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <Info className="w-5 h-5 md:w-6 md:h-6 text-gold-500 group-hover:scale-110 transition-transform" />
                <h5 className="font-bold text-gold-500 text-sm md:text-lg">হিসাব পদ্ধতি ও শর্তাবলী:</h5>
              </div>
              <ul className="text-[11px] md:text-[13px] text-brand-100/90 space-y-2 md:space-y-3 font-medium list-disc pl-5">
                <li>ব্যক্তিগত ব্যবহারের গাড়ি, বাড়ি, জায়গাজমি ও সামগ্রীর ওপর জাকাত ফরজ হয় না।</li>
                <li>নিসাব পরিমাণ এবং তদূর্ধ্ব সম্পদের মালিককে তার জাকাতযোগ্য সব সম্পদের প্রতি প্রতিবছর ২.৫% (চন্দ্রবর্ষ অনুযায়ী) প্রদান করতে হয়।</li>
                <li>সৌরবর্ষ অনুযায়ী জাকাত প্রদান করলে ২.৫৮% হারে হিসাব করতে হয়।</li>
                <li>যৌথ মালিকানাধীন ব্যবসার ক্ষেত্রে অংশীদারদের সম্পদের আলাদা হিসাব করতে হবে।</li>
              </ul>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24" id="zakat-result">
            {/* Net Result Card */}
            <div className="glass-card-dark rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border border-gold-500/30 bg-gradient-to-br from-brand-900/40 via-brand-950/20 to-brand-900/40 shadow-2xl relative overflow-hidden group animate-fade-in">
              <div className="absolute inset-0 bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 text-center">
                <p className="text-gold-500 font-bold text-[10px] md:text-[11px] uppercase tracking-[0.2em] mb-2 md:mb-3">
                  সম্ভাব্য জাকাত ({isSolarYear ? 'সৌরবর্ষ' : 'চন্দ্রবর্ষ'})
                </p>
                <div className="text-4xl md:text-6xl font-black text-gold-400 mb-4 md:mb-6 drop-shadow-[0_2px_15px_rgba(212,175,55,0.4)] font-sans tracking-tighter">
                  ৳{formatter.format(totals.zakatDue)}
                </div>

                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  <div className="flex justify-between items-center text-xs md:text-sm py-2 md:py-3 border-b border-brand-50/10">
                    <span className="text-brand-100/70 font-bold">মোট সম্পদ</span>
                    <span className="text-brand-50 font-black bg-brand-50/10 px-3 py-1 rounded-full">৳{formatter.format(totals.assets)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs md:text-sm py-2 md:py-3 border-b border-brand-50/10">
                    <span className="text-brand-100/70 font-bold">মোট দায় (ঋণ)</span>
                    <span className="text-red-400 font-black bg-red-400/10 px-3 py-1 rounded-full">- ৳{formatter.format(totals.liabilities)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs md:text-sm py-3 md:py-4">
                    <span className="text-gold-500 font-black uppercase tracking-wider">প্রযোজ্য হার</span>
                    <span className="text-brand-50 font-black text-lg">{(totals.rate * 100).toFixed(2)}%</span>
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
                    সম্পদের পরিমাণ নিসাবের উপরে গেলে {isSolarYear ? '২.৫৮%' : '২.৫%'} হারে যাকাত প্রদান করতে হবে।
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
