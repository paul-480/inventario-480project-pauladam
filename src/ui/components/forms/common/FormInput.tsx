import { type Control, type FieldPath, type FieldValues, Controller } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "../../ui/field";
import { Input , type InputProps} from "../../ui/input";

export interface FormInputProps<TFieldValues extends FieldValues> extends InputProps {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
}
export const FormInput = <TFieldValues extends FieldValues>({control,name,label,...props}:FormInputProps<TFieldValues>) => {
    return <div className='space-y-2'>
        <Controller
            control={control}
            name= {name}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={name}>{label}</FieldLabel>
                    <Input
                        {...field}
                        {...props}
                        aria-invalid={fieldState.invalid}
                        />
                    <FieldError errors={[fieldState.error]} />
                </Field>
            )} />
    </div>;
}