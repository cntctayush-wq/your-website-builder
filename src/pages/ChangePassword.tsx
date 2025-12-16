import { useState } from "react";
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

export default function ChangePassword() {
    const [step, setStep] = useState<"email" | "otp">("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const OTP_LENGTH = 6;

    const handleProceed = () => {
        if (!email) return;
        setStep("otp");
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background relative">
            <HexBackground />

            {/* Back button */}
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
                                {step === "email" ? (
                                    <Shield className="h-8 w-8 text-primary-foreground" />
                                ) : (
                                    <KeyRound className="h-8 w-8 text-primary-foreground" />
                                )}
                            </div>
                        </motion.div>

                        <CardTitle className="text-2xl font-bold">
                            Change Password
                        </CardTitle>
                        <CardDescription>
                            {step === "email"
                                ? "Enter your email to receive an OTP"
                                : "Enter the verification code sent to your email"}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-4">
                        <AnimatePresence mode="wait">
                            {/* STEP 1 — EMAIL */}
                            {step === "email" && (
                                <motion.div
                                    key="email-step"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="email"
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

                            {/* STEP 2 — OTP */}
                            {step === "otp" && (
                                <motion.div
                                    key="otp-step"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4"
                                >
                                    <div className="flex justify-center">
                                        <InputOTP
                                            maxLength={OTP_LENGTH}
                                            value={otp}
                                            onChange={setOtp}
                                        >
                                            <InputOTPGroup>
                                                {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                                                    <InputOTPSlot key={index} index={index} />
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