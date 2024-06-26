import { useFormContext } from "react-hook-form";
import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form.tsx";
import { cuisineList } from "@/config/restaurant-options-config.ts";
import CuisineCheckbox from "@/forms/manage-restaurant-form/CuisineCheckbox.tsx";

export default function CuisinesSection() {
    const { control } = useFormContext()
    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Cuisines</h2>
                <FormDescription>
                    Select the cuisines that your restaurant serves
                </FormDescription>
            </div>
            <FormField control={control} name="cuisines" render={({ field }) => (
                <FormItem>
                    <div className="grid md:grid-cols-5 gap-1">
                        {cuisineList.map((cuisine) => <CuisineCheckbox cuisine={cuisine} field={field}/>)}
                    </div>
                    <FormMessage/>
                </FormItem>
            )}></FormField>
        </div>
    );
}