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
  NumberInput,
  NumberInputField,
  NumberInputStepper,

  Text,
} from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { ViewIcon } from "@chakra-ui/icons";
import { ViewOffIcon } from "@chakra-ui/icons";
import Headingone from "../../components/shared/Headingone";
import { TextOne } from "../../components/shared/TextOne";
import LabelInput from "../../components/shared/LabelInput";
import postRegister from "./api/postRegister";

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: number;
}

const Register = () => {
  const [show, setShow] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { postRegisterMutation } = postRegister()

  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: {
      errors
    }
  } = useForm<RegisterFormData>();

  const onSubmitSignup: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      await postRegisterMutation.mutateAsync(data);
    } catch (error) {
    }
  };

  const handleClick = () => setShow(!show);
  const handleClickConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const password = watch("password", "");

  return (
    <>
      <Flex p={2} m={5} alignItems={"center"} justifyContent={"center"} height={"100vh"}>
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"100%"}
          height={"100%"}
        >


          <form onSubmit={handleSubmit(onSubmitSignup)}>
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
                  <Headingone title={"Sign Up"} textAlign={"center"} />

                  <TextOne
                    weight={"semibold"}
                    description={
                      " Enter your name,email and password to sign up"
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
                    label={"User Name"}
                    type={"text"}
                    registerName={"username"}
                    placeHolder={"Enter your Full Name"}
                    errorMessage={"Please Enter Your Name"}
                  />

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

                  <FormControl isInvalid={errors.confirmPassword !== undefined} mt={4}>
                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                      Confirm Password
                    </FormLabel>
                    <InputGroup size="md">
                      <Input
                        fontSize="sm"
                        ms={{ base: "0px", md: "4px" }}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        mb="8px"
                        size="lg"
                        {...register("confirmPassword", {
                          required: "Confirm Password is required",
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        })}
                      />

                      <InputRightElement width="4.5rem" mt={1}>
                        <Button
                          backgroundColor={"transparent"}
                          border={"none"}
                          h="1.75rem"
                          size="sm"
                          onClick={handleClickConfirmPassword}
                        >
                          {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {errors.confirmPassword && (
                      <FormErrorMessage>
                        <p>{errors.confirmPassword.message}</p>
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </Flex>



                <Flex gap={2} direction={{ base: "column", md: "row" }}>
                  <Box w={{ base: "100%", md: "50%" }}>

                    <>
                      <FormControl isInvalid={errors.phone !== undefined}>
                        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                          Phone Number
                        </FormLabel>
                        <Controller
                          name={"phone"}
                          border-radius={"0.3rem"}
                          control={control}
                          rules={{
                            required: "Phone is required",
                          }}
                          render={({ field }) => (
                            <>
                              <NumberInput mb={"8px"}>
                                <NumberInputField
                                  {...field}
                                  fontSize="sm"
                                  placeholder="Enter your Phone number"
                                />
                                <NumberInputStepper></NumberInputStepper>
                              </NumberInput>
                            </>
                          )}
                        />
                        <FormErrorMessage>
                          {errors.phone && errors.phone.message}
                        </FormErrorMessage>
                      </FormControl>
                    </>

                  </Box>
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
                    value={"Sign Up"}

                  ></Input>
                </LightMode>

                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  maxW="100%"
                  mt="0px"
                >
                  <Text color={"black"} fontWeight="medium">
                    Already have an account?

                    <Link to="/login" style={{ marginLeft: "12px", textDecoration: "underline", fontWeight: "bold" }}>Log In</Link>

                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </>
  );
};

export default Register;
