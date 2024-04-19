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
                <CardFooter className="absolute gap-y-2 bg-white/30 bottom-0  border-t-1 border-zinc-100/50 z-10 justify-between">
                    <Button className="text-tiny text-gray-700 flex justify-end" color="primary" radius="full" size="sm">
                        Get notified.
                    </Button>
                </CardFooter>
            </Card>
            <Card className="col-span-12 sm:col-span-4 md:col-span-5 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                </svg>
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
                                    </Card>
                                </li>

                            )
                        ) : (
                            <Card>
                                <CardBody className="flex my-4 flex-col overflow-auto gap-2 justify-center items-center mb-2 shadow-none">
                                    <div className="flex flex-col shadow-none">
                                        <p className="text-tiny text-gray-700">Your reBlug Calendar is clean.</p>
                                    </div>
                                </CardBody>
                            </Card>
                        )}
                    </ul>
                    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 justify-between">
                        <Button className="text-tiny text-gray-700" color="primary" radius="full" size="sm">
                            Get notified.
                        </Button>
                    </CardFooter>
                </div>
            </Card >
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
                    <p className="text-tiny text-white/60 uppercase font-bold">reBlug Lab</p>
                    <h4 className="text-white/90 font-medium text-xl">Earn recurring royalty for your ideas</h4>
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Relaxing app background"
                    className="z-0 w-full h-full object-cover"
                    src="/images/ideas.jpg"
                />
                <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                    <div className="flex flex-grow gap-2 items-center">
                        <Image
                            alt="Breathing app icon"
                            className="rounded-full w-10 h-11 bg-black"
                            src="/images/youtube.png"
                        />
                        <div className="flex flex-col">
                            <p className="text-tiny text-white/60">Let's build tools</p>
                            <p className="text-tiny text-white/60">Get a good night's sleep.</p>
                        </div>
                    </div>
                    <Button className="text-tiny " radius="full" size="sm">Get App</Button>
                </CardFooter>
            </Card>
        </div >
    );
}
