"use client";

import { useState, useEffect } from "react";
import { Lock, Delete } from "lucide-react";

export function PinLock({ children }: { children: React.ReactNode }) {
    const [isLocked, setIsLocked] = useState(true);
    const [pin, setPin] = useState("");
    const [expectedPin, setExpectedPin] = useState<string | null>(null);
    const [setupMode, setSetupMode] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const savedPin = localStorage.getItem("app_pin");
        if (savedPin) {
            setExpectedPin(savedPin);
        } else {
            setSetupMode(true);
        }
    }, []);

    const handleKeyPress = (num: string) => {
        if (pin.length < 4) {
            setError(false);
            setPin((prev) => prev + num);

            const newPin = pin + num;
            if (newPin.length === 4) {
                if (setupMode) {
                    localStorage.setItem("app_pin", newPin);
                    setExpectedPin(newPin);
                    setSetupMode(false);
                    setIsLocked(false);
                    setPin("");
                    // Derive a mock key for AES DB encryption
                    sessionStorage.setItem("app_derived_key", newPin + "salt_123");
                } else {
                    if (newPin === expectedPin) {
                        setIsLocked(false);
                        setPin("");
                        sessionStorage.setItem("app_derived_key", newPin + "salt_123");
                    } else {
                        setError(true);
                        setPin("");
                    }
                }
            }
        }
    };

    const handleBackspace = () => {
        setPin((prev) => prev.slice(0, -1));
        setError(false);
    };

    if (!isLocked) {
        return <>{children}</>;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 text-slate-50">
            <div className="w-full max-w-sm px-6 py-12 flex flex-col items-center">
                <Lock className="w-12 h-12 mb-6 text-blue-500" />
                <h1 className="text-2xl font-bold mb-2">
                    {setupMode ? "Cadastre seu PIN" : "Digite seu PIN"}
                </h1>
                <p className="text-slate-400 mb-8 text-center text-sm">
                    {setupMode
                        ? "Crie uma senha de 4 dígitos para proteger seus dados locais."
                        : "Acesso restrito. Insira o PIN para desbloquear."}
                </p>

                <div className="flex gap-4 mb-8">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={`w-4 h-4 rounded-full border-2 ${pin.length > i
                                    ? "bg-blue-500 border-blue-500"
                                    : error
                                        ? "border-red-500"
                                        : "border-slate-600"
                                } transition-colors duration-200`}
                        />
                    ))}
                </div>

                {error && <p className="text-red-500 text-sm mb-4">PIN incorreto. Tente novamente.</p>}

                <div className="grid grid-cols-3 gap-6 w-full max-w-[240px]">
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                        <button
                            key={num}
                            onClick={() => handleKeyPress(num)}
                            className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-xl font-medium hover:bg-slate-700 active:bg-slate-600 transition-colors"
                        >
                            {num}
                        </button>
                    ))}
                    <div /> {/* Empty space */}
                    <button
                        onClick={() => handleKeyPress("0")}
                        className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-xl font-medium hover:bg-slate-700 active:bg-slate-600 transition-colors"
                    >
                        0
                    </button>
                    <button
                        onClick={handleBackspace}
                        className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-medium text-slate-400 hover:text-slate-200 active:text-white transition-colors"
                    >
                        <Delete className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}
