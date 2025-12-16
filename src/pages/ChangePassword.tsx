import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

const OTP_LENGTH = 6

export default function ChangePassword() {
    const [step, setStep] = useState<"email" | "otp">("email")
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")

    const handleProceed = () => {
        if (!email) return
        setStep("otp")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                        Change Password
                    </CardTitle>
                    <CardDescription>
                        {step === "email"
                            ? "Enter your email to receive an OTP"
                            : "Enter the OTP sent to your email"}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* STEP 1 — EMAIL */}
                    {step === "email" && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <Button
                                className="w-full"
                                onClick={handleProceed}
                                disabled={!email}
                            >
                                Proceed
                            </Button>
                        </div>
                    )}

                    {/* STEP 2 — OTP */}
                    {step === "otp" && (
                        <div className="space-y-4">
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
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}