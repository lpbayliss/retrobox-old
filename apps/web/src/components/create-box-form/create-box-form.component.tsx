import { Button, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";

export type ICreateBoxFormInputs = {
  name: string;
};

type Props = {
  onSubmit(data: ICreateBoxFormInputs): void;
};

const CreateBoxForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ICreateBoxFormInputs>();

  const handleOnSubmit: SubmitHandler<ICreateBoxFormInputs> = (data) =>
    onSubmit(data);

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <FormControl isInvalid={!!errors.name}>
        <Input
          variant="filled"
          id="name"
          placeholder="Name Your Retro Box"
          {...register("name", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" },
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <Button type="submit" isLoading={isSubmitting}>
        Create Retro Box
      </Button>
    </form>
  );
};

export default CreateBoxForm;
