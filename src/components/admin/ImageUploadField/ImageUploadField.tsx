"use client"

import { useEffect, useRef, useState } from "react";
import { FormControl, FormLabel, InputGroup, Spinner } from "react-bootstrap";
import Image from "next/image";
import { s3ImageUrl } from "@/lib/storage";

type Props = {
    name?: string;
    defaultValue?: string;
    multiple?: boolean;
    required?: boolean;
    label?: string;
};

export default function ImageUploadField({
    name = "img",
    defaultValue = "",
    multiple = false,
    required = false,
    label = "Изображение",
}: Props) {
    const [value, setValue] = useState(defaultValue);
    const [status, setStatus] = useState<"idle" | "uploading" | "ok" | "error">("idle");
    const [message, setMessage] = useState("");
    const rootRef = useRef<HTMLDivElement>(null);
    const statusRef = useRef(status);
    statusRef.current = status;

    useEffect(() => {
        const form = rootRef.current?.closest("form");
        if (!form) return;
        const onSubmit = (event: Event) => {
            if (statusRef.current === "uploading") {
                event.preventDefault();
                event.stopPropagation();
            }
        };
        form.addEventListener("submit", onSubmit);
        return () => form.removeEventListener("submit", onSubmit);
    }, []);

    const keys = value.split("/").filter(Boolean);

    const handleFiles = async (files: FileList | null) => {
        if (!files?.length) return;

        setStatus("uploading");
        setMessage("Загрузка...");

        const formData = new FormData();
        Array.from(files).forEach((file) => formData.append("files", file));

        try {
            const response = await fetch("/api/picture", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Не удалось загрузить");
            }
            const nextValue = (result.keys as string[]).join("/");
            setValue(nextValue);
            setStatus("ok");
            setMessage(`Загружено: ${nextValue}`);
        } catch (error) {
            setStatus("error");
            setMessage(error instanceof Error ? error.message : "Ошибка загрузки");
        }
    };

    return (
        <div className="mb-3" ref={rootRef}>
            <FormLabel>{label}</FormLabel>
            {keys.length > 0 && (
                <div className="d-flex flex-wrap gap-2 mb-2">
                    {keys.map((key) => (
                        <Image
                            key={key}
                            width={80}
                            height={80}
                            src={s3ImageUrl(key)}
                            alt={key}
                        />
                    ))}
                </div>
            )}
            <InputGroup className="mb-2">
                <FormControl
                    type="text"
                    placeholder={multiple ? "имена через / или загрузите файлы" : "имя файла или загрузите файл"}
                    required={required}
                    name={name}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </InputGroup>
            <input
                className="form-control"
                type="file"
                accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                multiple={multiple}
                disabled={status === "uploading"}
                onChange={(e) => handleFiles(e.target.files)}
            />
            {status === "uploading" && (
                <div className="mt-2 d-flex align-items-center gap-2">
                    <Spinner animation="border" size="sm" />
                    <span>{message}</span>
                </div>
            )}
            {status !== "uploading" && message && (
                <div className={`mt-2 ${status === "error" ? "text-danger" : "text-success"}`}>
                    {message}
                </div>
            )}
            {multiple && (
                <div className="form-text">Несколько файлов склеятся через / и станут каруселью.</div>
            )}
        </div>
    );
}
