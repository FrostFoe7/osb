import React from "react";
import ZakatCalculator from "@/components/sections/ZakatCalculator";

interface ZakatProps {
    onBack: () => void;
}

const Zakat: React.FC<ZakatProps> = ({ onBack }) => {
    return (
        <div className="animate-fade-in">
            <ZakatCalculator onBack={onBack} />
        </div>
    );
};

export default Zakat;
