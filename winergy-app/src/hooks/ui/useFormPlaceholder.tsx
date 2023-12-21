import { useMemo } from "react";

type UsePlaceholderProps = {
  disabled?: boolean;
  placeholder?: string;
};

export const useFormPlaceholder = ({
  disabled,
  placeholder,
}: UsePlaceholderProps) => {
  const formPlaceholder: string | undefined = useMemo(
    () => (!!disabled ? undefined : placeholder),
    [disabled, placeholder]
  );

  return { formPlaceholder };
};
