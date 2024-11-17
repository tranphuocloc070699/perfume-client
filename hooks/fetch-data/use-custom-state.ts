import { useState, useCallback } from "react";

type UpdateData<T> = (updates: Partial<T>) => void;

function useCustomState<T>(initialState: T): [T, UpdateData<T>] {
  const [fields, setFields] = useState<T>(initialState);

  const updateFields: UpdateData<T> = useCallback((updates) => {
    setFields((prevFields) => ({
      ...prevFields,
      ...updates
    }));
  }, []);

  return [fields, updateFields];
}

export default useCustomState;
