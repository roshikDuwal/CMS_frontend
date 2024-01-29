import { useState } from "react";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  LightMode,

  Text,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, NavLink } from "react-router-dom";

import { ViewIcon } from "@chakra-ui/icons";
import { ViewOffIcon } from "@chakra-ui/icons";
import Headingone from "../../components/shared/Headingone";
import { TextOne } from "../../components/shared/TextOne";
import LabelInput from "../../components/shared/LabelInput";

import { postLogin } from "./api/postLogin";

export interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const [show, setShow] = useState(false);
  const { postLoginMutation } = postLogin();

  const {
    handleSubmit,
    register,
    formState: {
      errors
    }
  } = useForm<LoginFormData>();

  const onSubmitLogin: SubmitHandler<LoginFormData> = async (data) => {
    try {
      postLoginMutation.mutateAsync(data)
    } catch (error) {

    }
  };

  const handleClick = () => setShow(!show);


  return (
    <>
      <Flex p={2} m={5} alignItems={"center"} justifyContent={"center"} height={"90vh"}>
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"100%"}
          height={"100%"}
        >


          <form onSubmit={handleSubmit(onSubmitLogin)}>
            <Flex
              w="100%"
              h="100%"
              alignItems="center"
              justifyContent="center"
              mb={{ base: "30px", md: "60px" }}
              px={{ base: "25px", md: "0px" }}
              flexDirection="column"
              borderRadius="15px"
              boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
            >
              <Flex
                gap={2}
                direction={{ base: "column", md: "row" }}
                justifyContent={"space-around"}
                px={3}
                width={"100%"}
              >


                <Box me="auto" width={"100%"}>
                  <Headingone title={"LogIn"} textAlign={"center"} />

                  <TextOne
                    weight={"semibold"}
                    description={
                      " Enter your email and password to login up"
                    }
                  />
                </Box>
              </Flex>

              <Flex
                zIndex="2"
                direction="column"
                w={{ base: "100%", md: "900px" }}
                maxW="100%"
                background="transparent"
                me="auto"
                mb={{ base: "20px", md: "auto" }}
                p={2}
              >
                <Flex gap={2} direction={{ base: "column", md: "row" }}>


                  <LabelInput
                    register={register}
                    errors={errors}
                    label={"Email Address"}
                    type={"email"}
                    registerName={"email"}
                    placeHolder={"Enter your Email Address"}
                    errorMessage={"Please Enter Your Email"}
                  />
                </Flex>

                <Flex gap={2} direction={{ base: "column", md: "row" }}>
                  <FormControl isInvalid={errors.password !== undefined} mt={4}>
                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                      Password
                    </FormLabel>
                    <InputGroup size="md">
                      <Input
                        fontSize="sm"
                        ms={{ base: "0px", md: "4px" }}
                        type={show ? "text" : "password"}
                        placeholder="Enter your password"
                        mb="8px"
                        size="lg"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters",
                          },
                        })}
                      />

                      <InputRightElement width="4.5rem" mt={1}>
                        <Button
                          backgroundColor={"transparent"}
                          border={"none"}
                          h="1.75rem"
                          size="sm"
                          onClick={handleClick}
                        >
                          {show ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {errors.password && (
                      <FormErrorMessage>
                        <p>{errors.password && errors.password.message}</p>
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </Flex>


                <LightMode>
                  <Input
                    type="submit"
                    fontSize="14px"
                    colorScheme="blue"
                    fontWeight="bold"
                    cursor={"pointer"}
                    w="100%"
                    h="45"
                    mt={"15px"}
                    mb="8px"
                    value={"Login Up"}

                  ></Input>
                </LightMode>

                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  maxW="100%"
                  mt="0px"
                  gap={4}
                >
                  <Text color={"black"} fontWeight="medium">
                    Don't have an account?

                    <Link to="/register" style={{ marginLeft: "12px", textDecoration: "underline", fontWeight: "bold" }}>Sign Up</Link>
                  </Text>

                  <Button ><Link to={"/"} className="mr-5 hover:text-gray-900">Back to Home</Link></Button>
                </Flex>


              </Flex>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </>
  );
};

export default Login;
