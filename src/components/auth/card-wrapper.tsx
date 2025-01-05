"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./back-button";
import Header from "./header";
import Social from "./social";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
    register?: boolean;

};


export const CardWrapper = ({
    children,
    headerLabel,
    backButtonHref,
    backButtonLabel,
    showSocial,
    register
}: CardWrapperProps) => {
    return (
        <Card className={`p-6 ${register ? 'w-[600px]' : 'w-[400px]'} shadow-md`}>
            <CardHeader>
                <Header label={headerLabel}/>
            </CardHeader>
            {children}
            {showSocial && (
                <CardFooter className="mt-4">
                    <Social />
                </CardFooter>
            )}
            <Card className="border-none mt-4 shadow-none">
                <BackButton 
                label={backButtonLabel}
                href={backButtonHref}
                />
            </Card>
        </Card>
    )
}