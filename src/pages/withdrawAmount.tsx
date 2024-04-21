import * as React from 'react';


import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import {useState} from "react";
import {MapElement} from "@/components/LocationsInMap";
import {useRouter} from "next/router";
import Image from "next/image";
import Link from "next/link";
import JSConfetti from "js-confetti";

const WAITING_STEP = 'WAITING_STEP';
const CONFIRMATION_STEP = 'CONFIRMATION_STEP';
const SUCCESS_STEP = 'SUCCESS_STEP';

const AmountPage = () => {
    const [formAmount, setAmount] = useState();

    const [shownPartner, setShownPartner] = useState<MapElement>();
    const [currentStep, setCurrentStep] = useState<string>(WAITING_STEP);
    const router = useRouter();

    const handleSubmit = async (formData: any) => {

        const formAmount = {
            amount: formData.get("amount")
        }
    }
    return (

        <div className='overflow-hidden bg-background'>

            <div className='mx-auto mt-6 w-full px-2 md:mt-8 md:max-w-5xl md:p-2'>
                <>
                    <div
                        className='mx-auto mb-12 flex flex-col items-center justify-center text-4xl sm:flex-row sm:text-2xl'>
                        {currentStep === WAITING_STEP && (


                            <Card className={"w-full shadow-md"}>
                                <CardHeader className={"text-2xl text-[#202020] items-center font-bold"}>
                                    Withdraw crypto
                                </CardHeader>
                                <CardContent>
                                    <form action={handleSubmit}
                                    >
                                        <div className='mx-auto text-2xl text-center sm:mx-1'>
                                            enter amount:
                                            <div className={"flex flex-col gap-2"}>
                                                <input
                                                    className={"bg-gray-50 text-[#202020] text-2xl justify-center border rounded-xl shadow font-normal leading-normal"}
                                                    name={"amount"}
                                                    type={"number"}
                                                    pattern={"0-9"}
                                                    onChange={(e:any) => setAmount(e.target.value)}
                                                >
                                                </input>
                                                <div
                                                    className={"w-full text-[#202020] bg-[#618BFF] text-2xl border rounded-xl shadow font-normal leading-normal"}>
                                                    <button
                                                        type={"submit"}
                                                        onClick={() => {
                                                            setTimeout(() => {
                                                                setCurrentStep(WAITING_STEP);
                                                            }, 8500);
                                                            setCurrentStep(SUCCESS_STEP);
                                                            const jsConfetti = new JSConfetti();
                                                            jsConfetti.addConfetti({
                                                                emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
                                                            });
                                                        }}
                                                    >send
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                </CardContent>
                            </Card>
                        )}
                        {currentStep === SUCCESS_STEP && (
                            <div className='flex flex-col w-full items-center justify-center sm:mx-1'>
                                <Image
                                    width={250}
                                    height={250}
                                    alt='withdrawal successful'
                                    src='/assets/images/greentick.png'
                                />
                                <h1 className='text-center'>Withdrawal succesful</h1>
                                <p className='text-center text-lg'>$ {formAmount}</p>

                                <p className='overflow-hidden text-ellipsis whitespace-nowrap'>
                                    View on blockchain explorer:
                                </p>
                                <Link className={"w-full"} href='https://www.blockchain.com/explorer/addresses/btc/bc1qw9fm787vw8chlc6rqttuhw7yv4d7sne2w5t223mk07ttq9wnr6jqqskzy9'>
                                    bc1qw9fm787vw8chlc6rqttuhw7yv4d7s...
                                </Link>
                            </div>

                        )}
                    </div>

                </>
            </div>

        </div>

    );
}

export default AmountPage;