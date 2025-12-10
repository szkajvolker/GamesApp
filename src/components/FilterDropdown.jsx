const FilterDropdown = ({ label, options, value, onChange }) => {
  return (
    <div className=" rounded-lg flex flex-col py-4">
      {label && <label className="mb-2 text-gray-300 font-semibold">{label}</label>}
      <select
        className="w-40 h-10 px-5 py-2 rounded-lg bg-gray-700 text-gray-300 font-semibold text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Choose</option>
        {options.map((opt) => (
          <option key={opt.id || opt} value={opt.id || opt}>
            {opt.name || opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
