import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { AspectRatio } from "@/components/ui/aspect-ratio.tsx";
import { ChangeEvent, useEffect, useState } from "react";

export default function ImageSection() {
    const { control, watch } = useFormContext();
    const existingImageUrl = watch("imageUrl");
    const [imageUrl, setImageUrl] = useState<string | undefined>(existingImageUrl);
    useEffect(() => {
        setImageUrl(existingImageUrl);
    }, [existingImageUrl]);
    // let [isSave, setIsSave] = useState(false)

    const handleImageChange = (event : ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const newImageUrl = URL.createObjectURL(file);
            setImageUrl(newImageUrl);
            // setIsSave(true);
        } else {
            setImageUrl(existingImageUrl);
        }
    };
    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Image</h2>
                <FormDescription>
                    Add an image that will be displayed on your restaurant listing in the search results. Adding a new
                    image will overwrite the existing one.
                </FormDescription>
            </div>
            <div className="flex flex-col gap-8 md:w-[50%]">
                {
                    imageUrl && (
                        <AspectRatio ratio={16 / 9}>
                            <img src={imageUrl} alt="Restaurant image"
                                 className="rounded-md object-cover h-full w-full"/>
                        </AspectRatio>
                    )
                }
                <FormField control={control} name="imageFile" render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input className="bg-white" type="file" accept=".jpg, .jpeg, .png"
                                   onChange={(event) => {
                                       handleImageChange(event);
                                       field.onChange(event.target.files ? event.target.files[0] : null);
                                   }}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
            </div>
                            {/*{isSave &&*/}
                            {/*    <small className="text-destructive">Image has changes! Press submit to update.</small>}*/}
        </div>
    )
        ;
}