'use client';

import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useGetSiteSettingsQuery, useUpdateSiteSettingsMutation } from '@/redux/api/settingsApi';

const defaultSettings = {
    whatsappNumber: '8801810011145',
    whatsappConfirmMessage: 'Hi ZysLet, I placed an order. Order ID: {orderId}. Please confirm my order.',
    freeShippingThreshold: 0,
    minimumOrderAmount: 0,
    enableAnnouncementBar: false,
    announcementText: '',
};

const SettingsPage = () => {
    const { data, isLoading } = useGetSiteSettingsQuery();
    const [updateSiteSettings, { isLoading: isSaving }] = useUpdateSiteSettingsMutation();

    const [form, setForm] = useState(defaultSettings);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!data?.data) return;

        setForm({
            whatsappNumber: data.data.whatsappNumber || defaultSettings.whatsappNumber,
            whatsappConfirmMessage:
                data.data.whatsappConfirmMessage || defaultSettings.whatsappConfirmMessage,
            freeShippingThreshold: Number(data.data.freeShippingThreshold || 0),
            minimumOrderAmount: Number(data.data.minimumOrderAmount || 0),
            enableAnnouncementBar: Boolean(data.data.enableAnnouncementBar),
            announcementText: data.data.announcementText || '',
        });
    }, [data]);

    const validate = () => {
        const nextErrors: Record<string, string> = {};
        const whatsappDigits = form.whatsappNumber.replace(/\D/g, '');

        if (!whatsappDigits || whatsappDigits.length < 8 || whatsappDigits.length > 15) {
            nextErrors.whatsappNumber = 'Enter a valid WhatsApp number (8-15 digits).';
        }

        if (!form.whatsappConfirmMessage.trim()) {
            nextErrors.whatsappConfirmMessage = 'WhatsApp confirmation message is required.';
        } else if (!form.whatsappConfirmMessage.includes('{orderId}')) {
            nextErrors.whatsappConfirmMessage = 'Message must include {orderId} placeholder.';
        }

        if (Number(form.freeShippingThreshold) < 0) {
            nextErrors.freeShippingThreshold = 'Free shipping threshold cannot be negative.';
        }

        if (Number(form.minimumOrderAmount) < 0) {
            nextErrors.minimumOrderAmount = 'Minimum order amount cannot be negative.';
        }

        if (form.enableAnnouncementBar && !form.announcementText.trim()) {
            nextErrors.announcementText = 'Announcement text is required when bar is enabled.';
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const preview = useMemo(() => {
        const sampleOrderId = 'ORDER-12345';
        const cleanNumber = form.whatsappNumber.replace(/\D/g, '');
        const previewMessage = form.whatsappConfirmMessage.includes('{orderId}')
            ? form.whatsappConfirmMessage.split('{orderId}').join(sampleOrderId)
            : `${form.whatsappConfirmMessage} ${sampleOrderId}`;

        return {
            cleanNumber,
            previewMessage,
            previewUrl: `https://wa.me/${cleanNumber}?text=${encodeURIComponent(previewMessage)}`,
        };
    }, [form.whatsappNumber, form.whatsappConfirmMessage]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validate()) {
            toast.error('Please fix validation errors before saving.');
            return;
        }

        try {
            await updateSiteSettings({
                ...form,
                freeShippingThreshold: Number(form.freeShippingThreshold || 0),
                minimumOrderAmount: Number(form.minimumOrderAmount || 0),
            }).unwrap();

            toast.success('Settings updated successfully');
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to update settings');
        }
    };

    const handleResetToDefaults = () => {
        setForm(defaultSettings);
        setErrors({});
        toast.success('Defaults loaded. Click save to apply.');
    };

    if (isLoading) {
        return <div className="p-4">Loading settings...</div>;
    }

    return (
        <div className="grid xl:grid-cols-3 gap-5">
            <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5 md:p-6">
                <div className="mb-5 flex items-start justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Site Settings</h1>
                        <p className="text-sm text-gray-500">Configure dynamic ecommerce settings for ZysLet.</p>
                    </div>
                    <button
                        type="button"
                        onClick={handleResetToDefaults}
                        className="px-3 py-2 text-xs font-medium border border-amber-300 text-amber-700 rounded-md hover:bg-amber-50">
                        Reset to Defaults
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                            <input
                                type="text"
                                value={form.whatsappNumber}
                                onChange={(event) =>
                                    setForm((prev) => ({ ...prev, whatsappNumber: event.target.value }))
                                }
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                placeholder="8801810011145"
                                required
                            />
                            {errors.whatsappNumber && (
                                <p className="text-xs text-red-600 mt-1">{errors.whatsappNumber}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Free Shipping Threshold (৳)
                            </label>
                            <input
                                type="number"
                                min={0}
                                value={form.freeShippingThreshold}
                                onChange={(event) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        freeShippingThreshold: Number(event.target.value || 0),
                                    }))
                                }
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                            {errors.freeShippingThreshold && (
                                <p className="text-xs text-red-600 mt-1">{errors.freeShippingThreshold}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            WhatsApp Confirmation Message
                        </label>
                        <textarea
                            rows={3}
                            value={form.whatsappConfirmMessage}
                            onChange={(event) =>
                                setForm((prev) => ({ ...prev, whatsappConfirmMessage: event.target.value }))
                            }
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            placeholder="Use {orderId} placeholder in message"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Use <span className="font-medium">{'{orderId}'}</span> where order ID should appear.
                        </p>
                        {errors.whatsappConfirmMessage && (
                            <p className="text-xs text-red-600 mt-1">{errors.whatsappConfirmMessage}</p>
                        )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Minimum Order Amount (৳)
                            </label>
                            <input
                                type="number"
                                min={0}
                                value={form.minimumOrderAmount}
                                onChange={(event) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        minimumOrderAmount: Number(event.target.value || 0),
                                    }))
                                }
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                            {errors.minimumOrderAmount && (
                                <p className="text-xs text-red-600 mt-1">{errors.minimumOrderAmount}</p>
                            )}
                        </div>

                        <div className="flex items-end">
                            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={form.enableAnnouncementBar}
                                    onChange={(event) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            enableAnnouncementBar: event.target.checked,
                                        }))
                                    }
                                />
                                Enable announcement bar
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Announcement Text</label>
                        <input
                            type="text"
                            value={form.announcementText}
                            onChange={(event) =>
                                setForm((prev) => ({ ...prev, announcementText: event.target.value }))
                            }
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            placeholder="Example: Free delivery over ৳1500"
                        />
                        {errors.announcementText && (
                            <p className="text-xs text-red-600 mt-1">{errors.announcementText}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSaving}
                        className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-70">
                        {isSaving ? 'Saving...' : 'Save Settings'}
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 md:p-6 h-fit">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Live Preview</h2>

                <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-green-50 border border-green-100">
                        <p className="text-xs text-gray-500 mb-1">WhatsApp CTA URL</p>
                        <p className="text-green-700 break-all text-xs">{preview.previewUrl}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                        <p className="text-xs text-gray-500 mb-1">WhatsApp Message Preview</p>
                        <p className="text-blue-700 text-xs">{preview.previewMessage}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Pricing Rules</p>
                        <p className="text-xs text-gray-700">
                            Free shipping over: <span className="font-medium">৳{form.freeShippingThreshold}</span>
                        </p>
                        <p className="text-xs text-gray-700">
                            Minimum order: <span className="font-medium">৳{form.minimumOrderAmount}</span>
                        </p>
                    </div>

                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                        <p className="text-xs text-gray-500 mb-1">Announcement Bar</p>
                        <p className="text-xs text-amber-700">
                            {form.enableAnnouncementBar
                                ? form.announcementText || 'Enabled but text is empty'
                                : 'Disabled'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;

