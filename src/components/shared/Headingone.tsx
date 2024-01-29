import { Heading, ResponsiveValue } from "@chakra-ui/react";



interface HeadingoneProps{
  title:string;
  textAlign?: ResponsiveValue<"left" | "center" | "right">;
}

const Headingone = ({ title, textAlign }:HeadingoneProps) => {
  return (
    <>
      <Heading 
        color={"black"}
        textAlign={textAlign ? textAlign : "center"}
        fontSize="22px"
        mb="2px"
      >
        {title}
      </Heading>
    </>
  );
};

export default Headingone;
