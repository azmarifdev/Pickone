import {useFormContext} from "react-hook-form";
import FormInput from "@/components/reusable/form/FormInputHF";
import {SectionTitle} from "./section-title";
import {useCategoryListQuery} from "@/redux/api/categoryApi";
import {useDebounce} from "@/hooks/useDebounce";
import {useProductListsQuery} from "@/redux/api/productApi";
import CustomSearchSelect from "@/components/reusable/form/CustomSearchSelect";
import React, {useState} from "react";

interface BundleProduct {
    value: string;
    label: string;
}

export function AddProductBasicInformationSection({
    setBundleProducts,
    bundleProducts = [],
    onGenerateProductCode,
}: {
    setBundleProducts: React.Dispatch<React.SetStateAction<BundleProduct[]>>;
    bundleProducts?: BundleProduct[];
    onGenerateProductCode: () => void;
}) {
    const {
        register,
        watch,
        formState: {errors},
    } = useFormContext();

    const currentCode = watch("code");

    const {data: categories} = useCategoryListQuery();

    // Use search term for debouncing
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const {data: bundleProductsData} = useProductListsQuery({
        queries: `search=${debouncedSearchTerm}`,
    });

    // Handle bundle product selection directly
    const handleBundleProductChange = (value: any) => {
        if (Array.isArray(value)) setBundleProducts(value);
    };

    return (
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <SectionTitle title="Basic Information" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                    name="title"
                    label="Product Title"
                    placeholder="Enter product title"
                    required
                />
                <div>
                    <label htmlFor="code" className="text-gray-700 text-base">
                        Product Code
                        <span className="text-red-700 ml-1">*</span>
                    </label>
                    <div className="mt-1.5 flex gap-2">
                        <input
                            id="code"
                            type="text"
                            placeholder="Auto-generated product code"
                            {...register("code")}
                            className="border border-slate-400 rounded-lg focus:outline-primary w-full h-11 px-4 py-[18px] bg-transparent text-gray-700"
                        />
                        <button
                            type="button"
                            onClick={onGenerateProductCode}
                            className="h-11 whitespace-nowrap px-4 rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors text-sm font-medium">
                            Generate New
                        </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5">
                        Ecommerce-style SKU format: <span className="font-medium">SKU-YYMMDD-XXXX-XXXXX</span>
                    </p>
                    {currentCode && (
                        <p className="text-xs text-emerald-600 mt-1">
                            Current code: <span className="font-semibold">{currentCode}</span>
                        </p>
                    )}
                    {errors.code && (
                        <p className="mt-1 text-sm text-red-600">
                            {typeof errors.code?.message === "string" &&
                                errors.code.message}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="category"
                        className="block text-gray-700 mb-1.5">
                        Category
                    </label>
                    <select
                        id="category"
                        className="border border-slate-400 rounded-lg focus:outline-primary text-gray-700 w-full px-4 h-11 bg-transparent"
                        {...register("category")}>
                        <option value="">Select a category</option>
                        {categories?.data?.map((category: any) => (
                            <option key={category.id} value={category.id}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                    {errors.category && (
                        <p className="mt-1 text-sm text-red-600">
                            {typeof errors.category?.message === "string" &&
                                errors.category.message}
                        </p>
                    )}
                </div>

                <FormInput
                    name="quantity"
                    label="Quantity"
                    type="number"
                    placeholder="Enter quantity"
                    required
                />
                <FormInput
                    name="price"
                    label="Price"
                    type="number"
                    placeholder="Enter price"
                    required
                />
                <FormInput
                    name="discount"
                    label="Discount Percentage"
                    type="number"
                    placeholder="Enter discount percentage"
                />

                <div className="flex items-center space-x-2">
                    <input
                        id="is_free_shipping"
                        type="checkbox"
                        {...register("is_free_shipping")}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="is_free_shipping" className="text-gray-700">
                        Free Shipping available
                    </label>
                </div>
                <div className="flex items-center space-x-2">
                    <input
                        id="show_related_products"
                        type="checkbox"
                        {...register("show_related_products")}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label
                        htmlFor="show_related_products"
                        className="text-gray-700">
                        Show related products
                    </label>
                </div>
                <div className="col-span-2">
                    <CustomSearchSelect
                        name="bundle_products_display" // Use a different name to avoid form integration conflicts
                        label="Bundle Products (free shipping)"
                        options={
                            bundleProductsData?.data?.map((product: any) => ({
                                value: product?.id,
                                label: product?.title,
                            })) || []
                        }
                        searchable
                        isMulti
                        defaultValue={bundleProducts}
                        onChange={handleBundleProductChange}
                        onSearch={(value) => {
                            setSearchTerm(value);
                        }}
                        placeholder="Search and select products for bundle"
                    />
                </div>
            </div>
        </section>
    );
}
