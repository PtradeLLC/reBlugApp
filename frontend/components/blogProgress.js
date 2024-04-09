import { useState, useEffect } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid'
import NoviceUI from '@/components/NoviceChatUI';

const steps = [
    { id: '01', name: 'Get tips for Title', title: "Title", description: 'Begin by entering a Title above. Click here to launch AI-tool guide for tips and ideas for this step.', href: '#', status: 'current' },
    { id: '02', name: 'Get tips for Content', title: "Content Body", description: 'Write your content above. Need help with this step? Article Assistant is here to help. Click here.', href: '#', status: 'upcoming' }, //'complete' for completed steps
    { id: '03', name: 'Get tips for Conclusion', title: "Conclusion", description: 'Finalize your blog and preview.', href: '#', status: 'upcoming' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Progress() {
    const [isOpen, setIsOpen] = useState(false);
    const [postTitleStep, setPostTitleStep] = useState(steps[0].name);
    const [postBodyStep, setPostBodyStep] = useState(steps[1].name);
    const [postConclusionStep, setPostConclusionStep] = useState(steps[2].name);
    const [label, setLabel] = useState('');

    const handleStepClick = (event, stepName) => {
        event.preventDefault();
        setIsOpen(true);

        if (stepName === "Get tips for Title") {
            setLabel(stepName);
        } else if (stepName === "Get tips for Content") {
            setLabel(stepName);
        } else if (stepName === "Get tips for Conclusion") {
            setLabel(stepName);
        }
    };

    // Inside the return statement:
    {
        steps.map((step, stepIdx) => (
            <li key={step.id} className="relative overflow-hidden lg:flex-1">
                <div
                    className={classNames(
                        stepIdx === 0 ? 'rounded-t-md border-b-0' : '',
                        stepIdx === steps.length - 1 ? 'rounded-b-md border-t-0' : '',
                        'overflow-hidden border border-red-200 lg:border-0'
                    )}
                >
                    {step.status === 'complete' ? (
                        <button onClick={() => handleStepClick(step.name)} className="group">
                            {/* Content for complete steps */}
                        </button>
                    ) : step.status === 'current' ? (
                        <button onClick={() => handleStepClick(step.name)} aria-current="step">
                            {/* Content for current step */}
                        </button>
                    ) : (
                        <button onClick={() => handleStepClick(step.name)} className="group">
                            {/* Content for upcoming steps */}
                        </button>
                    )}
                    {/* Separator */}
                </div>
            </li>
        ))
    }

    return (
        <>
            <div className="lg:border-b lg:border-t lg:border-gray-200">
                <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Progress">
                    <ol
                        role="list"
                        className="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200"
                    >
                        {steps.map((step, stepIdx) => (
                            <li key={step.id} className="relative overflow-hidden lg:flex-1">
                                <div
                                    className={classNames(
                                        stepIdx === 0 ? 'rounded-t-md border-b-0' : '',
                                        stepIdx === steps.length - 1 ? 'rounded-b-md border-t-0' : '',
                                        'overflow-hidden border border-red-200 lg:border-0'
                                    )}
                                >
                                    {step.status === 'current' ? (
                                        <button className='px-4 py-1' onClick={(event) => handleStepClick(event, step.name)} aria-current="step">
                                            <span
                                                className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-red-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                                                aria-hidden="true"
                                            />
                                            <span
                                                className={classNames(
                                                    stepIdx !== 0 ? 'lg:pl-9' : '',
                                                    'flex items-start px-6 py-5 text-md font-bold'
                                                )}
                                            >
                                                <span className="flex-shrink-0">
                                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
                                                        {/* <CheckIcon className="h-6 w-6 text-gray-400" aria-hidden="true" /> */}
                                                        <p className="h-6 w-6 text-white" aria-hidden="true" >{step.id}</p>
                                                    </span>
                                                </span>
                                                <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                                                    <span className="text-sm font-bold">{step.title}</span>
                                                    <span className="text-sm text-left font-medium text-red-500">{step.description}</span>
                                                </span>
                                            </span>
                                        </button>
                                    ) : (
                                        <button onClick={(event) => handleStepClick(event, step.name)} className="group px-4 py-1">
                                            {/* Content for upcoming steps */}
                                            <span
                                                className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-red-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                                                aria-hidden="true"
                                            />
                                            <span
                                                className={classNames(
                                                    stepIdx !== 0 ? 'lg:pl-9' : '',
                                                    'flex items-start px-6 py-5 text-md font-bold'
                                                )}
                                            >
                                                <span className="flex-shrink-0">
                                                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-green-600">
                                                        {/* <CheckIcon className="h-6 w-6 text-gray-400" aria-hidden="true" /> */}
                                                        <p className="h-6 w-6 text-gray-400" aria-hidden="true" >{step.id}</p>
                                                    </span>
                                                </span>
                                                <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                                                    <span className="text-sm font-bold">{step.title}</span>
                                                    <span className="text-sm text-left font-medium text-red-500">{step.description}</span>
                                                </span>
                                            </span>
                                        </button>
                                    )}
                                    {stepIdx !== 0 ? (
                                        <>
                                            {/* Separator */}
                                            <div className="absolute inset-0 left-0 top-0 hidden w-3 lg:block" aria-hidden="true">
                                                <svg
                                                    className="h-full w-full text-green-300"
                                                    viewBox="0 0 12 82"
                                                    fill="none"
                                                    preserveAspectRatio="none"
                                                >
                                                    <path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor" vectorEffect="non-scaling-stroke" />
                                                </svg>
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
            <div>
                <div>
                    <NoviceUI
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        stepLabel={label}
                        setSetLabel={label}
                    />
                </div>
            </div>
        </>
    )
}
