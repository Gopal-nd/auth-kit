'use client'

import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from '@/components/ui/card'
import Header from '@/components/auth/Header';
import Social from '@/components/auth/Social';
import BackButton from '@/components/auth/BackButton';

interface CardWrapperProps {
    children:React.ReactNode;
    headerLabel:string;
    backButtonLabel:string;
    backButtonHref:string;
    showSocial?:boolean;
}

const CardWrapper = ({children,headerLabel,backButtonHref,backButtonLabel,showSocial}:CardWrapperProps) => {
  return (
    <div className='w-[400px] shadow-md'>
        <CardHeader>
            <Header label={headerLabel}/>
        </CardHeader>
        <CardContent>
        {children}
        {
            showSocial && (
                <CardFooter >
                    <Social/>
                </CardFooter>
            )
        }
        </CardContent>
        <CardFooter>
            <BackButton 
            label = {backButtonLabel}
            href = {backButtonHref}
            />
        </CardFooter>
            
    </div>
  )
}

export default CardWrapper