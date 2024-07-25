import { forwardRef, useId } from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react"

const RTK = forwardRef(function RTK({
    name,
    control
}, ref) {

    const id = useId();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange }, fieldState, formState }) =>
                <Editor
                    apiKey={import.meta.env.VITE_TINYMCE}
                    value={value}
                    onEditorChange={onChange}
                    init={{
                        branding : false,
                        height: 350,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:1.5rem }'
                    }}
                />
            }
        />
    )

})

export default RTK;