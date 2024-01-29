import { ResponsiveValue, Text } from "@chakra-ui/react";


interface TextOneProps{
  color?:string;
  weight:string;
  textAlign?:ResponsiveValue<"left" | "center" | "right">;
  description:string;
}

export const TextOne = ({ color, weight, textAlign, description }:TextOneProps) => {
  return (
    <>
      <Text
        mb="36px"
        ms="4px"
        color={color ? color : "black"}
        fontWeight={weight ? weight : "bold"}
        fontSize={"15px"}
        textAlign={textAlign ? textAlign : "center"}
      >
        {description}
      </Text>
    </>
  );
};


