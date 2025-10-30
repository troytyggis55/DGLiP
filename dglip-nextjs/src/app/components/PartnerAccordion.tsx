"use client";
import {SanityDocument} from "@sanity/client";

import { Accordion } from "@base-ui-components/react/accordion";

export default function PartnerAccordion({ partners }: { partners: SanityDocument[] }) {
    return (
        <Accordion.Root openMultiple={false} className="flex w-full flex-col justify-center">
            {partners.map((partner, idx) => {
                return (
                    <Accordion.Item className="border-b border-gray-200" key={idx}>
                        <Accordion.Trigger className="group relative flex w-full items-baseline justify-between gap-4 py-2 pr-1 pl-3 text-left font-medium">
                            <h3>{partner.name}</h3>
                            <img
                                src="/chevron_updown.svg"
                                alt="Toggle"
                                className="mr-2 size-3 shrink-0 transition-all ease-out group-data-[panel-open]:rotate-x-180"
                            />
                        </Accordion.Trigger>
                        <Accordion.Header>
                        </Accordion.Header>
                        <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden text-base transition-[height] ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
                            <div className="p-3">
                                {partner.description}
                            </div>
                        </Accordion.Panel>
                    </Accordion.Item>
                )
            })}
        </Accordion.Root>
    );
}


