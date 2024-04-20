import * as React from 'react';


import {
    Card,
    CardContent,
    CardHeader,
    } from "@/components/ui/card";

import {useState} from "react";

const AmountPage = () => {

    const handleSubmit = async (formData:any) => {
        const rawFormData = {
            amount: formData.get("amount")
        }
    }
    return (

        <div className='overflow-hidden bg-background'>

            <div className='mx-auto mt-6 w-full px-2 md:mt-8 md:max-w-5xl md:px-4'>
                <>
                    <div
                        className='mx-auto mb-12 flex flex-col items-center justify-center text-4xl sm:flex-row sm:text-4xl'>

                        <Card className={"w-full shadow-md"}>
                            <CardHeader className={"text-2xl items-center font-bold"}>
                                Withdraw crypto
                            </CardHeader>
                            <CardContent>
                                <form action={handleSubmit}>
                                <div className='mx-auto text-2xl text-center sm:mx-1'>
                                    enter amount:
                                    <div className={"flex flex-col gap-2"}>
                                        <input
                                            className={"bg-gray-50 text-2xl justify-center border rounded-xl shadow font-normal leading-normal"}
                                            name={"amount"}
                                            type={"number"}
                                        >
                                        </input>
                                        <div
                                            className={"bg-gray-50 text-2xl border rounded-xl shadow font-normal leading-normal"}>
                                            <button
                                                className={""}
                                                type={"submit"}
                                                >send</button>
                                        </div>
                                    </div>
                                </div>
                                </form>

                            </CardContent>
                        </Card>
                    </div>

                </>
            </div>

        </div>

    );
}

export default AmountPage;