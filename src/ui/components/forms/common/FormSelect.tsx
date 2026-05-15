import { type Control, type FieldPath, type FieldValues, Controller } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "../../ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/ui/components/ui/select";

export interface FormSelectOption {
    value: string;
    label: string;
}

export interface FormSelectProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    name: FieldPath<TFieldValues>;
    label: string;
    placeholder?: string;
    options: FormSelectOption[];
}

export const FormSelect = <TFieldValues extends FieldValues>({
    control,
    name,
    label,
    placeholder = "Selecciona una opción",
    options,
}: FormSelectProps<TFieldValues>) => {
    return (
        <div className="space-y-2">
            <Controller
                control={control}
                name={name}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={name}>{label}</FieldLabel>
                        <Select value={field.value ?? ""} onValueChange={field.onChange}>
                            <SelectTrigger id={name} aria-invalid={fieldState.invalid} className="w-full">
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {options.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FieldError errors={[fieldState.error]} />
                    </Field>
                )}
            />
        </div>
    );
};
