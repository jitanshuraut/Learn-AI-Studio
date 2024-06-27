import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <>
      <h1 className="text-7xl text-[#8678F9] text-center font-headingAlt font-bold">
        FAQ
      </h1>
      <div className="w-[80%] mx-auto border border-white/[0.2] p-3 rounded-md">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How accurate is the AI in generating course content?</AccordionTrigger>
            <AccordionContent className="text-[#8678F9] font-bold">
            LearnAI Studio uses advanced algorithms to ensure the content is accurate and relevant, but users can always customize and enhance the AI-generated material.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I integrate my own materials into the generated courses?</AccordionTrigger>
            <AccordionContent className="text-[#8678F9] font-bold">
            Absolutely! Users can easily add their own documents, videos, and other materials to the AI-generated framework.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is there a limit to the number of courses I can create?</AccordionTrigger>
            <AccordionContent className="text-[#8678F9] font-bold">
            No, LearnAI Studio is designed to scale with your needs, allowing you to create as many courses as required.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
