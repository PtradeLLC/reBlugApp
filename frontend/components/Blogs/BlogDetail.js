import React from "react";
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";

export default function CategoryCard({ title, author }) {
    // const { title, content, createdAt, author, views } = posts
    return (
        <div className="">
            <Card isFooterBlurred className="w-full h-[400px] col-span-12 sm:col-span-7">
                <CardHeader className="absolute bg-transparent backdrop-blur z-10 top-0 flex-col items-start">
                    <p className="text-tiny text-white uppercase font-bold">Your day your way</p>
                    <h4 className="text-white font-medium text-xl">{title}</h4>
                </CardHeader>
                <img
                    alt="Relaxing app background"
                    className="z-0 w-full h-full flex justify-center items-center object-cover"
                    src="/images/makesup.jpg"
                    style={{ objectPosition: 'top' }}
                />
                <CardFooter className="absolute bg-white bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                    <div className="flex flex-grow gap-2 items-center">
                        <div className="flex flex-col">
                            <p className="text-sm font-semibold text-slate-900">Breathing App</p>
                            {/* <p className="text-sm text-slate-900 line-clamp-3">{content}</p> */}
                            <span className="flex justify-between item-center my-1 w-full">
                                <img
                                    alt="Breathing app icon"
                                    className="rounded-full h-9 w-9 object-cover bg-black"
                                    src="/images/youtube.png"
                                />
                                <p className="text-sm text-slate-900 font-thin">author</p>
                                <p className="text-sm text-slate-900 font-thin">Feb 28</p>
                                <span className="text-slate-900 text-sm flex font-thin">
                                    92
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mx-0 font-thin text-slate-900">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg></span>
                                <Button className="px-1 bg-white font-bold" radius="full" size="sm">Read More</Button>
                            </span>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
