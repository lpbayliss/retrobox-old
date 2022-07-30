import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";

export type ICreateItemFormInputs = {
  author: string;
  message: string;
};

type Props = {
  onSubmit(data: ICreateItemFormInputs): void;
};

const CreateItemForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ICreateItemFormInputs>();

  const handleOnSubmit: SubmitHandler<ICreateItemFormInputs> = (data) =>
    onSubmit(data);

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <FormControl isInvalid={!!errors.author}>
        <FormLabel>Your Name</FormLabel>
        <Input
          variant="filled"
          id="author"
          placeholder="Luke Skywalker"
          {...register("author")}
        />
        <FormHelperText>
          (Optional) Let your team know who added this item
        </FormHelperText>
        <FormErrorMessage>
          {errors.author && errors.author.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.message}>
        <FormLabel>Retro Item</FormLabel>
        <Input
          variant="filled"
          id="message"
          placeholder="There isn't enough blue milk"
          {...register("message", {
            required: "You must include a message as part of your submission",
            minLength: { value: 5, message: "Minimum length should be 5" },
          })}
        />
        <FormHelperText>Let your team know who added this item</FormHelperText>
        <FormErrorMessage>
          {errors.message && errors.message.message}
        </FormErrorMessage>
      </FormControl>

      <Button type="submit" isLoading={isSubmitting}>
        Submit Item
      </Button>
    </form>
  );
};

export default CreateItemForm;
