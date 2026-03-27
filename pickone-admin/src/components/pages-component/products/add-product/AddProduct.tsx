"use client";
import {useEffect, useState, type KeyboardEvent} from "react";
import {useForm, FormProvider} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {SubmitHandler} from "react-hook-form";
import {AddProductBasicInformationSection} from "./components/basic-information-section";
import {ProductDetailsSection} from "./components/product-details";
import {AttributesSection} from "./components/attributes-section";
import {SpecificationsSection} from "./components/specifications-section";
import {SEOInformationSection} from "./components/seo-information-section";
import {MediaSection} from "./components/media-section";
import {useCreateProductMutation} from "@/redux/api/productApi";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {productSchema} from "./validation";
import {DescriptionBlocksSection} from "./components/DescriptionBlocksSection";

type ProductFormValues = z.infer<typeof productSchema>;

interface BundleProduct {
    value: string;
    label: string;
}

export default function ProductAddPage() {
    const [mainFeatures, setMainFeatures] = useState("");
    const [importantNote, setImportantNote] = useState("");
    const [bundleProducts, setBundleProducts] = useState<BundleProduct[]>([]);

    const [metaKeywordInput, setMetaKeywordInput] = useState("");
    const [metaKeywords, setMetaKeywords] = useState<string[]>([]);

    // State for media
    const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
    const [productImages, setProductImages] = useState<File[]>([]);

    const form = useForm<any>({
        resolver: zodResolver(productSchema),
        mode: "onChange",
        defaultValues: {
            quantity: 1,
            is_published: false as boolean,
            is_free_shipping: false as boolean,
            show_related_products: false as boolean,
            attributes: [
                {
                    title: "",
                    values: [],
                },
            ] as {title: string; values: string[]}[],
            meta_keywords: [] as string[],
            product_images: [] as File[],
            specifications: [
                {key: "", value: ""} as {key: string; value: string},
            ] as {key: string; value: string}[],
            description_blocks: [
                {description: "", image: undefined} as {
                    description?: string;
                    image?: File | undefined;
                },
            ] as {
                description?: string;
                image?: File | undefined;
            }[],
        },
    });

    const {handleSubmit, setValue, getValues} = form;

    const generateProductCode = (title?: string) => {
        const now = new Date();
        const year = now.getFullYear().toString().slice(-2);
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const datePart = `${year}${month}${day}`;

        const titlePart = (title || "ITEM")
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "")
            .slice(0, 4)
            .padEnd(4, "X");

        const randomPart = Math.random()
            .toString(36)
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "")
            .slice(0, 5)
            .padEnd(5, "0");

        return `SKU-${datePart}-${titlePart}-${randomPart}`;
    };

    const handleGenerateProductCode = () => {
        const generatedCode = generateProductCode(getValues("title"));
        setValue("code", generatedCode, {shouldValidate: true, shouldDirty: true});
    };

    useEffect(() => {
        const existingCode = getValues("code");
        if (!existingCode) {
            handleGenerateProductCode();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleMainFeaturesChange = (value: string) => {
        setMainFeatures(value);
        setValue("main_features", value, {shouldValidate: true});
    };

    const handleImportantNoteChange = (value: string) => {
        setImportantNote(value);
        setValue("important_note", value, {shouldValidate: true});
    };

    // Handle meta keyword input
    const handleMetaKeywordKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && metaKeywordInput.trim()) {
            e.preventDefault();
            const newKeywords = [...metaKeywords, metaKeywordInput.trim()];
            setMetaKeywords(newKeywords);
            setValue("meta_keywords", newKeywords);
            setMetaKeywordInput("");
        }
    };

    // Remove meta keyword
    const removeMetaKeyword = (index: number) => {
        const newKeywords = metaKeywords.filter((_, i) => i !== index);
        setMetaKeywords(newKeywords);
        setValue("meta_keywords", newKeywords);
    };

    // Remove product image
    const removeProductImage = (index: number) => {
        const newImages = productImages.filter((_, i) => i !== index);
        setProductImages(newImages);
        setValue("product_images", newImages);
    };

    const [createProduct, {isLoading}] = useCreateProductMutation();
    const router = useRouter();

    const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
        const newFormData = new FormData();

        // Append product fields
        newFormData.append("title", data.title);
        newFormData.append("code", data.code);
        newFormData.append("category", data.category);
        newFormData.append("price", data.price.toString());
        newFormData.append("quantity", data.quantity.toString());
        newFormData.append("is_published", data.is_published.toString());
        newFormData.append(
            "show_related_products",
            data.show_related_products.toString()
        );
        newFormData.append(
            "is_free_shipping",
            data.is_free_shipping.toString()
        );

        // Append optional fields (if they exist)
        if (data.discount) {
            newFormData.append("discount", data.discount.toString());
        }

        if (data.description) {
            newFormData.append("desc", data.description);
        }

        if (data.youtube_video) {
            newFormData.append("youtube_video", data.youtube_video);
        }

        if (data.main_features) {
            newFormData.append("main_features", data.main_features);
        }

        if (data.important_note) {
            newFormData.append("important_note", data.important_note);
        }

        if (Array.isArray(data.attributes)) {
            data.attributes.forEach((attr, i) => {
                newFormData.append(`attributes[${i}][title]`, attr.title);
                attr.values.forEach((val) =>
                    newFormData.append(`attributes[${i}][values][]`, val)
                );
            });
        }

        // Append specifications fields (if they exist)
        if (Array.isArray(data.specifications)) {
            data.specifications.forEach((spec) => {
                newFormData.append(`specifications[key]`, spec.key);
                newFormData.append(`specifications[value]`, spec.value);
            });
        }

        if (Array.isArray(bundleProducts)) {
            bundleProducts.forEach((product) => {
                newFormData.append(`bundle_products[]`, product.value);
            });
        }

        if (Array.isArray(data.description_blocks)) {
            data.description_blocks.forEach((block, index) => {
                newFormData.append(
                    `description_blocks[${index}][description]`,
                    block.description || ""
                );

                if (block.image) {
                    newFormData.append(
                        `description_blocks[${index}][image]`,
                        block.image
                    );
                }
            });
        }

        // Append meta fields (if they exist)
        if (Array.isArray(data.meta_keywords)) {
            data.meta_keywords.forEach((keyword) => {
                newFormData.append("meta_keywords[]", keyword);
            });
        }

        if (data.meta_desc) {
            newFormData.append("meta_desc", data.meta_desc);
        }

        // Append media fields (thumbnail and images)
        if (thumbnailImage) {
            newFormData.append("thumbnail", thumbnailImage);
        }

        if (Array.isArray(productImages)) {
            productImages.forEach((image) => {
                newFormData.append("images", image);
            });
        }

        const response = await createProduct(newFormData);
        if (response.error) {
            // Handle error
            toast.error(
                (response.error &&
                "message" in response.error &&
                typeof response.error.message === "string"
                    ? response.error.message
                    : "Something went wrong while adding the product.") ||
                    "Something went wrong while adding the product."
            );
        } else {
            toast.success("Product created successfully!");
            router.push("/product/manage-product");
        }
    };

    return (
        <div className="max-w-5xl space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 via-white to-indigo-50 px-6 py-5 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
                <p className="text-sm text-slate-600 mt-1">
                    Create a premium product listing with complete details, media, and SEO metadata.
                </p>
            </div>

            <FormProvider {...form}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-8"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") e.preventDefault();
                    }}>
                    {/* Basic Information Section */}
                    <AddProductBasicInformationSection
                        setBundleProducts={setBundleProducts}
                        bundleProducts={bundleProducts}
                        onGenerateProductCode={handleGenerateProductCode}
                    />
                    <DescriptionBlocksSection />

                    {/* Media Section */}
                    <MediaSection
                        thumbnailImage={thumbnailImage}
                        productImages={productImages}
                        setThumbnailImage={setThumbnailImage}
                        setProductImages={setProductImages}
                        removeProductImage={removeProductImage}
                    />

                    {/* Product Details Section */}
                    <ProductDetailsSection
                        mainFeatures={mainFeatures}
                        importantNote={importantNote}
                        onMainFeaturesChange={handleMainFeaturesChange}
                        onImportantNoteChange={handleImportantNoteChange}
                    />

                    {/* Attributes Section */}
                    <AttributesSection />

                    {/* Specifications Section */}
                    <SpecificationsSection />

                    {/* SEO Information Section */}
                    <SEOInformationSection
                        metaKeywordInput={metaKeywordInput}
                        metaKeywords={metaKeywords}
                        setMetaKeywordInput={setMetaKeywordInput}
                        handleMetaKeywordKeyDown={handleMetaKeywordKeyDown}
                        removeMetaKeyword={removeMetaKeyword}
                    />

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed">
                            {isLoading ? "Adding..." : "Add Product"}
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}
