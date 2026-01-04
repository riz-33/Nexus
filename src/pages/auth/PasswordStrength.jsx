import { CheckCircle, XCircle } from "lucide-react";

export const PasswordStrength = ({ password }) => {
  const rules = [
    { label: "At least 8 characters", test: password.length >= 8 },
    { label: "One uppercase letter", test: /[A-Z]/.test(password) },
    { label: "One lowercase letter", test: /[a-z]/.test(password) },
    { label: "One number", test: /\d/.test(password) },
    { label: "One special character", test: /[@$!%*?&]/.test(password) },
  ];

  const strength = rules.filter((r) => r.test).length;

  return (
    <div className="mt-2 space-y-2">
      {/* Strength Bar */}
      <div className="h-2 w-full bg-gray-200 rounded">
        <div
          className={`h-2 rounded transition-all ${
            strength <= 2
              ? "bg-red-500 w-1/4"
              : strength <= 4
              ? "bg-yellow-500 w-3/4"
              : "bg-green-500 w-full"
          }`}
        />
      </div>

      {/* Rules */}
      {rules.map((rule) => (
        <div key={rule.label} className="flex items-center gap-2 text-sm">
          {rule.test ? (
            <CheckCircle size={14} className="text-green-600" />
          ) : (
            <XCircle size={14} className="text-red-500" />
          )}
          <span>{rule.label}</span>
        </div>
      ))}
    </div>
  );
};
