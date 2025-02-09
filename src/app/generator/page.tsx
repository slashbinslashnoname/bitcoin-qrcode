'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function QRCodeGeneratorPage() {
    const qrCodeRef = React.useRef<SVGSVGElement>(null);
    const form = useForm({
        defaultValues: {
            text: "",
        },
        mode: "onChange",
    });


    const downloadQRCode = () => {
        if (!qrCodeRef.current) return;
        
        const svg = qrCodeRef.current;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const svgData = new XMLSerializer().serializeToString(svg);
        const img = new Image();
        
        canvas.width = svg.width.baseVal.value;
        canvas.height = svg.height.baseVal.value;
        
        img.onload = () => {
            if (!ctx) return;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.download = 'qr-code.png';
            downloadLink.href = pngFile;
            downloadLink.click();
        };
        
        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Bitcoin Address QR Code Generator</CardTitle>
                    <CardDescription>Enter your Bitcoin address to generate a QR code</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Form {...form}>
                        <form className="space-y-4">
                            <FormField
                                control={form.control}
                                name="text"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bitcoin Address</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter your Bitcoin address"
                                                className="resize-none"
                                                rows={4}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {form.watch("text") && (
                                <div className="mb-4 p-4 rounded-md shadow-md">
                                    <QRCodeSVG
                                        ref={qrCodeRef}
                                        value={`bitcoin:${form.watch("text")}`}
                                        size={256}
                                        level="H"
                                    />
                                </div>
                            )}
                            {!form.watch("text") && (
                                <div className="mb-4 p-4 text-muted-foreground">
                                    Enter your Bitcoin address to generate QR code
                                </div>
                            )}
                            {form.watch("text") && (
                                <Button variant="outline" type="button" onClick={downloadQRCode}>
                                    Download PNG
                                </Button>
                            )}
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

export default QRCodeGeneratorPage; 