import { Box, Flex, FormControl, FormErrorMessage, FormLabel, Input, LightMode, NumberInput, NumberInputField, Textarea } from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import LabelInput from "../../components/shared/LabelInput";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { Auth } from "../../utils/auth";
import { AxiosInstance } from "../../axios/Axios";
import { useMutation } from "react-query";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";


export interface ContactFormData {
  username: string;
  email: string;
  phone: number;
  message: string;
}

const Contact = () => {
  const { userDetail } = useContext(AuthContext);
  const { isAuthenticated } = Auth();
  const {
    handleSubmit,
    register,
    control,
    formState: {
      errors
    },
    reset,
    setValue,
  } = useForm<ContactFormData>();

  async function getcontactForm(data: ContactFormData) {
    const res = await AxiosInstance.post("/contactform", data);
    return res;
  }

  const postContactMutation = useMutation<AxiosResponse<any>, undefined, ContactFormData>({
    mutationFn: async (request) => await getcontactForm(request),
    onSuccess: async (response) => {
      reset();
      setValue("message", "")
      toast.success(response.data.message);
    },
    onError: async (error: any) => {
      toast.error(error.response.data.message);
    },
  })


  const onSubmitSignup: SubmitHandler<ContactFormData> = async (data) => {
    try {
      postContactMutation.mutateAsync(data)
    } catch (error) {
     
    }
  };


  useEffect(() => {
    if (userDetail && isAuthenticated()) {
      setValue("username", userDetail.username);
      setValue("email", userDetail.email);
      setValue("phone", userDetail.phone);
    }

  }, [isAuthenticated, userDetail])

  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className="absolute inset-0 bg-gray-300">

          <iframe width="100%" height="100%" title="map" src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed" style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.4)' }} />
        </div>

        <div className="container px-5 py-24 mx-auto flex">
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">

            <Flex p={2} m={5} alignItems={"center"} justifyContent={"center"}>
              <Flex
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
                height={"100%"}
              >

                <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmitSignup)}>

                  <LabelInput
                    label={"User Name"}
                    type={"text"}
                    register={register}
                    errors={errors}
                    registerName={"username"}
                    placeHolder={"Enter your Full Name"}
                    errorMessage={"Please Enter Your Name"}
                  />

                  <LabelInput
                    label={"Email Address"}
                    type={"email"}
                    register={register}
                    errors={errors}
                    registerName={"email"}
                    placeHolder={"Enter your Email Address"}
                    errorMessage={"Please Enter Your Email"}
                  />

                  <Box w={{ base: "100%" }}>
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
                              <NumberInput  {...field} mb={"8px"}>
                                <NumberInputField

                                  fontSize="sm"
                                  placeholder="Enter your Phone number"
                                />

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

                  <Box w={{ base: "100%" }}>

                    <>
                      <FormControl isInvalid={errors.message !== undefined}>
                        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                          Message
                        </FormLabel>
                        <Controller
                          name={"message"}
                          border-radius={"0.3rem"}
                          control={control}
                          rules={{
                            required: "Message is required",
                          }}
                          render={({ field }) => (
                            <>
                              <Textarea
                                {...field}
                                placeholder='Enter a Message'
                                size='sm'
                              />

                            </>
                          )}
                        />
                        <FormErrorMessage>
                          {errors.message && errors.message.message}
                        </FormErrorMessage>
                      </FormControl>
                    </>

                  </Box>

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
                      value={"Submit"}

                    ></Input>
                  </LightMode>




                </form>
              </Flex>
            </Flex>
          </div>
        </div>
      </section>


    </>

  )
}

export default Contact