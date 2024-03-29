import { Input } from "@nextui-org/react";
import React from "react";

const NextTextInputField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Input
      type="text"
      variant="flat"
      label={label}
      size="sm"
      value={value}
      onChange={onChange}
    />
  );
};

export default NextTextInputField;
