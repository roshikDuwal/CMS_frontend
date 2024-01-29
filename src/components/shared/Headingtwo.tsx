import { Grid, Text } from "@chakra-ui/react";


interface HeadingtwoProps{
  title:string;
}

const Headingtwo = ({ title }:HeadingtwoProps) => {
  return (
    <Grid templateColumns="repeat(2, 1fr)">
      <Text fontSize={"1rem"} fontWeight="bold">
        {title}
      </Text>
    </Grid>
  );
};

export default Headingtwo;
