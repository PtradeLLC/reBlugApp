import React, { useState } from "react";
import { Card, CardHeader, CardFooter, Image, Button, CardBody } from "@nextui-org/react";
import Calendar from "./Calendar";
import CreditCartInput from "./CreditCartInput";

export default function AllActiveComponent() {
    // const { data: activity } = useSWR("/api/activity", fetcher);
    const [activity, setActivity] = useState(null);

    return (
        <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-4">
            <Card className="col-span-12 sm:col-span-7 md:col-span-7">
                <CardBody className="w-[-webkit-fill-available] h-[-webkit-fill-available]">
                    <Calendar />
                </CardBody>
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <Button className="text-tiny text-gray-700" color="primary" radius="full" size="sm">
                        Get notified.
                    </Button>
                </CardFooter>
            </Card>
            <Card className="col-span-12 sm:col-span-4 md:col-span-5 ">
                <CardHeader className="absolute w-[-webkit-fill-available] px-4 top-1 flex-col bg-slate-100 mb-3 shadow-sm !items-start">
                    <p className="text-tiny text-gray-900 uppercase font-bold">Your Calendar</p>
                </CardHeader>
                <div className="flex mt-20 flex-col gap-2 justify-center items-center">
                    <ul>
                        {activity ? (
                            (
                                <li>
                                    <Card>
                                        <CardBody className="flex my-4 flex-col overflow-auto gap-2 justify-center items-center mb-2">
                                            <p className="text-gray-700 text-tiny">{activity}</p>
                                        </CardBody>
                                        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-end mt-2">
                                            <Button className="text-tiny text-gray-700 " color="primary" radius="full" size="sm">
                                                Get notified.
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </li>
                            )
                        ) : (
                            <Card>
                                <CardBody className="flex my-4 flex-col overflow-auto gap-2 justify-center items-center mb-2">
                                    <p className="text-gray-700 text-tiny">No activities</p>
                                </CardBody>
                                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-end mt-2">
                                    <Button className="text-tiny text-gray-700 " color="primary" radius="full" size="sm">
                                        Get notified.
                                    </Button>
                                </CardFooter>
                            </Card>
                        )}
                    </ul>
                    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 justify-between">
                        <Button className="text-tiny text-gray-700" color="primary" radius="full" size="sm">
                            Get notified.
                        </Button>
                    </CardFooter>
                </div>
            </Card>
            <Card isFooterBlurred className="w-full col-span-12 sm:col-span-5">
                <Card className="col-span-12 sm:col-span-7 md:col-span-7">
                    <CardBody>
                        <CreditCartInput className="w-[-webkit-fill-available] h-[-webkit-fill-available]" />
                    </CardBody>
                </Card>
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <p className="text-black text-tiny">Available soon.</p>
                        <p className="text-black text-tiny">Get notified.</p>
                    </div>
                    <Button className="text-tiny" color="primary" radius="full" size="sm">
                        Notify Me
                    </Button>
                </CardFooter>
            </Card>
            <Card isFooterBlurred className="w-full col-span-12 sm:col-span-7">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">Your day your way</p>
                    <h4 className="text-white/90 font-medium text-xl">Your checklist for better sleep</h4>
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Relaxing app background"
                    className="z-0 w-full h-full object-cover"
                    src="/images/pete.jpg"
                />
                <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                    <div className="flex flex-grow gap-2 items-center">
                        <Image
                            alt="Breathing app icon"
                            className="rounded-full w-10 h-11 bg-black"
                            src="/images/youtube.png"
                        />
                        <div className="flex flex-col">
                            <p className="text-tiny text-white/60">Breathing App</p>
                            <p className="text-tiny text-white/60">Get a good night's sleep.</p>
                        </div>
                    </div>
                    <Button className="text-tiny " radius="full" size="sm">Get App</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
