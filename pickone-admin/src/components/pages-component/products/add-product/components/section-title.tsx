export function SectionTitle({title}: {title: string}) {
    return (
        <div className="mb-5 pb-3 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
        </div>
    );
}
