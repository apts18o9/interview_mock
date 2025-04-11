import React from 'react'
import {Controller, FieldValues, Path, Control} from "react-hook-form"
import { Input } from "@/components/ui/input"
import {
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

// Define props interface
interface FormFieldProps<T extends FieldValues> {
    control: Control<T>
    name: Path<T>
    label: string
    placeholder: string;
    type?: 'text' | 'email' | 'password' | 'file'
    // Use proper type: Control<z.infer<typeof formSchema>>
}


const FormField = <T extends FieldValues>({control, name, label, placeholder, type="text"}: FormFieldProps<T>) => (
    <Controller
        name={name}
        control = {control}
        render={({ field}) => (
                <FormItem>
                    <FormLabel className="label">{label}</FormLabel>
                    <FormControl>
                        <Input
                            className="input"
                            placeholder={placeholder}
                            type={type}
                            {...field}
                        />

                    </FormControl>

                    <FormMessage />
                </FormItem>
        )}
        />
)



export default FormField
