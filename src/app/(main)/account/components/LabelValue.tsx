export const LabelValue = ({
  label,
  value,
  valueClassName = ''
}: {
  label: string;
  value: string | React.ReactNode;
  valueClassName?: string;
}) => (
  <div className="space-y-1">
    <div className="text-sm text-gray-400">{label}</div>
    <div className={`text-gray-100 ${valueClassName}`}>
      {value}
    </div>
  </div>
);