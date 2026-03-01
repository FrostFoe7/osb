import React, { useState } from "react";
import { Calculator, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ZakatCalculator: React.FC = () => {
  const [cash, setCash] = useState("");
  const [gold, setGold] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculateZakat = (e: React.FormEvent) => {
    e.preventDefault();
    const cashVal = parseFloat(cash) || 0;
    const goldVal = parseFloat(gold) || 0;
    const total = cashVal + goldVal;
    const zakat = total * 0.025; // 2.5%
    setResult(zakat);
  };

  const formatter = new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <section id="zakat" className="py-24 border-t border-brand-50/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-50 inline-block pb-2">
            জাকাত ক্যালকুলেটর
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mt-4 rounded-full opacity-80"></div>
        </div>
        <div className="max-w-4xl mx-auto glass-card-dark rounded-[2.5rem] p-6 sm:p-10 md:p-16 shadow-[0_0_50px_var(--color-brand-950)]">
          <div className="flex items-center gap-4 mb-8 border-b border-brand-50/10 pb-6">
            <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center border border-gold-500/30">
              <Calculator className="w-6 h-6 text-gold-400" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-brand-50">
              আপনার সম্পদের পবিত্রতা রক্ষা করুন
            </h3>
          </div>
          <form className="space-y-6" onSubmit={calculateZakat}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-brand-100/70">
                  নগদ অর্থ (টাকায়)
                </Label>
                <Input
                  type="number"
                  value={cash}
                  onChange={(e) => setCash(e.target.value)}
                  className="w-full bg-brand-950/40 border-brand-50/10 rounded-2xl h-12 sm:h-14 text-brand-50 focus:ring-gold-500"
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-brand-100/70">
                  স্বর্ণ/রৌপ্য মূল্য (টাকায়)
                </Label>
                <Input
                  type="number"
                  value={gold}
                  onChange={(e) => setGold(e.target.value)}
                  className="w-full bg-brand-950/40 border-brand-50/10 rounded-2xl h-12 sm:h-14 text-brand-50 focus:ring-gold-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gold-500 text-brand-950 py-6 sm:py-8 rounded-2xl font-bold text-base sm:text-lg hover:bg-gold-400 transition-colors flex justify-center items-center gap-2 mt-4 h-auto"
            >
              হিসাব করুন <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          {result !== null && (
            <div className="mt-8 p-6 bg-brand-900/50 rounded-2xl border border-gold-500/30 text-center animate-fade-in">
              <p className="text-brand-100/70 mb-2">
                আপনার সম্ভাব্য জাকাতের পরিমাণ:
              </p>
              <h4 className="text-3xl font-bold text-gold-400">
                ৳ {formatter.format(result)}
              </h4>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ZakatCalculator;
