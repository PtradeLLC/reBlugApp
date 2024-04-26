import React, { useState } from "react";
import { Card, CardHeader, CardFooter, Image, Button, CardBody } from "@nextui-org/react";
import Calendar from "./Calendar";

export default function CalendarComponent() {

    const [activity, setActivity] = useState(null);

    return (
        <div className="w-full gap-2 grid grid-cols-12 px-4">
            <Card className="col-span-12 ">
                <CardHeader className=" px-4 top-1 flex-col bg-slate-100 mb-3 shadow-sm !items-start">
                    <span className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg>
                        <p className="text-tiny text-gray-900 uppercase font-bold">Your Calendar</p>
                    </span>
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
                            <div className="flex my-4 flex-col overflow-auto gap-2 justify-center items-center mt-10">
                                <p className="text-tiny drop-shadow-md shadow-white text-gray-700">Your reBlug Calendar is clear.</p>
                            </div>
                        )}
                    </ul>
                    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 justify-between">
                        <Button className="text-tiny text-gray-700" color="primary" radius="full" size="sm">
                            Start a project
                        </Button>
                    </CardFooter>
                </div>
            </Card >
            <Card className="col-span-12">
                <CardBody className="flex">
                    <Calendar />
                </CardBody>
            </Card>

        </div >
    );
}
