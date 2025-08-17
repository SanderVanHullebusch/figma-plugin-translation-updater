import React, { useId, useRef } from 'react';

import './file-input.css';

type Props = {
  file: File | null;
  setFile: (file: File | null) => void;
  label: string;
  onClear?: () => void;
};

export const FileInput = ({ label, file, setFile, onClear }: Props) => {
  const id = useId();
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <label htmlFor={id}>
      <input
        id={id}
        name={id}
        ref={ref}
        type="file"
        accept=".json,application/json"
        multiple={false}
        onChange={(e) => {
          console.log(e.target.files);
          if (e.target.files) {
            setFile(e?.target?.files?.[0] ?? null);
          }
        }}
        style={{ display: 'none' }}
      />
      <div className="buttonGroup">
        <button onClick={() => ref.current?.click()}>{label}</button>
        {file ? (
          <button
            className="button-black button-small"
            onClick={(e) => {
              if (onClear) {
                onClear();
                // @ts-ignore
                ref.current.value = null;
              }
              e.preventDefault();
            }}
          >
            x
          </button>
        ) : (
          <></>
        )}
      </div>
    </label>
  );
};
