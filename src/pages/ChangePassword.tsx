import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { HexBackground } from "@/components/HexBackground";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft, Mail, Shield, KeyRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Step = "email" | "verifying" | "otp";

export default function ChangePassword() {
    const [step, setStep] = useState<Step>("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const OTP_LENGTH = 6;

    const handleProceed = () => {
        if (!email) return;
        setStep("verifying");
    };

    // Auto move from verifying → otp after 4s
    useEffect(() => {
        if (step === "verifying") {
            const timer = setTimeout(() => {
                setStep("otp");
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [step]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background relative">
            <HexBackground />

            {/* Back */}
            <div className="absolute top-4 left-4 z-20">
                <Link to="/login">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                </Link>
            </div>

            {/* Theme toggle */}
            <div className="absolute top-4 right-4 z-20">
                <ThemeToggle />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10 my-8"
            >
                <Card className="backdrop-blur-sm shadow-2xl border-0">
                    <CardHeader className="text-center pb-2">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="mx-auto mb-4"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center shadow-lg shadow-primary/30">
                                {step === "otp" ? (
                                    <KeyRound className="h-8 w-8 text-primary-foreground" />
                                ) : (
                                    <Shield className="h-8 w-8 text-primary-foreground" />
                                )}
                            </div>
                        </motion.div>

                        <CardTitle className="text-2xl font-bold">
                            Change Password
                        </CardTitle>
                        <CardDescription>
                            {step === "email" && "Enter your email to receive an OTP"}
                            {step === "verifying" && "Verifying your email address"}
                            {step === "otp" && "Enter the verification code sent to your email"}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-4">
                        <AnimatePresence mode="wait">
                            {/* EMAIL STEP */}
                            {step === "email" && (
                                <motion.div
                                    key="email"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                type="email"
                                                placeholder="you@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full"
                                        onClick={handleProceed}
                                        disabled={!email}
                                    >
                                        Proceed
                                    </Button>
                                </motion.div>
                            )}

                            {/* VERIFYING STEP */}
                            {step === "verifying" && (
                                <motion.div
                                    key="verifying"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center justify-center gap-4 py-8"
                                >
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 1.2,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                        className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent"
                                    />

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-sm text-muted-foreground"
                                    >
                                        Verifying email securely…
                                    </motion.p>
                                </motion.div>
                            )}

                            {/* OTP STEP */}
                            {step === "otp" && (
                                <motion.div
                                    key="otp"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-4"
                                >
                                    <div className="flex justify-center">
                                        <InputOTP
                                            maxLength={OTP_LENGTH}
                                            value={otp}
                                            onChange={setOtp}
                                        >
                                            <InputOTPGroup>
                                                {Array.from({ length: OTP_LENGTH }).map((_, i) => (
                                                    <InputOTPSlot key={i} index={i} />
                                                ))}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>

                                    <Button
                                        className="w-full"
                                        disabled={otp.length !== OTP_LENGTH}
                                    >
                                        Verify OTP
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        className="w-full text-sm"
                                        onClick={() => setStep("email")}
                                    >
                                        Change email
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}