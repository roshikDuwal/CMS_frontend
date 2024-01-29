import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FieldErrors, FieldValues, Path, UseFormRegister,} from "react-hook-form";


type LabelInputProps<T extends FieldValues> = {
  label: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  registerName:Path<T>;
  placeHolder: string;
  errorMessage: string;
  type:string;

}

const LabelInput = <T extends FieldValues>({
  label,
  register,
  errors,
  registerName,
  type = "text",
  placeHolder,
  errorMessage,
}: LabelInputProps<T>) => {

  const hasError = !!(errors as Record<keyof T, any>)[registerName as string];

  return (
    <>
      <FormControl isInvalid={hasError }>
        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
          {label}
        </FormLabel>
        <Input
          fontSize="sm"
          ms={{ base: "0px", md: "4px" }}
          type={type}
          placeholder={placeHolder}
          mb={"8px"}
          size="lg"
          {...register(registerName, { required: true })}
        />
        {hasError  && (
          <FormErrorMessage>
            <p>{errorMessage}</p>
          </FormErrorMessage>
        )}
      </FormControl>
    </>
  );
};

export default LabelInput;
