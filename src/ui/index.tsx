import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { FileInput } from './components';
import {
  isJSON,
  postPluginMessage,
  readFileAsText,
  resolveTranslations,
} from './utils';

import './style.css';
import './buttons.css';

const App = () => {
  const [translationsFile, setTranslationsFile] = useState<File | null>(null);
  const [mockValuesFile, setMockValuesFile] = useState<File | null>(null);

  // State that will be sent to figmaUI
  const [translations, setTranslations] = useState<Record<string, string>>({});

  const onClickReadFile = async () => {
    if (!translationsFile) {
      return;
    }

    const translationsFileContent = (await readFileAsText({
      file: translationsFile,
    })) as string;

    const mockValuesFileContent = mockValuesFile
      ? ((await readFileAsText({ file: mockValuesFile })) as string)
      : '{}';

    if (
      !isJSON(JSON.stringify(translationsFileContent)) ||
      !isJSON(JSON.stringify(mockValuesFileContent))
    ) {
      console.log('File(s) is not correctly structured');
      return;
    }

    const resolvedTranslations = resolveTranslations({
      ...JSON.parse(translationsFileContent),
      ...JSON.parse(mockValuesFileContent),
    });
    console.log(resolvedTranslations);
    setTranslations(resolvedTranslations);
  };

  const onClickTranslateNodes = () => {
    postPluginMessage({ type: 'translate-nodes', payload: translations });
  };

  useEffect(() => {
    if (translationsFile || mockValuesFile) {
      onClickReadFile();
    }
  }, [translationsFile, mockValuesFile]);

  return (
    <>
      {/* --- TRANSLATIONS --- */}
      <div className="fileContainer">
        <FileInput
          label={'Translation file'}
          file={translationsFile}
          setFile={setTranslationsFile}
          onClear={() => {
            setTranslationsFile(null);
            setMockValuesFile(null);
          }}
        />
        <p>{translationsFile ? translationsFile.name : '-'}</p>
      </div>

      {/* --- MOCK VALUES --- */}
      {/*{translationsFile ? (*/}
      <div className="fileContainerIndent">
        <div className="fileContainer">
          <FileInput
            label={'Mock values file'}
            file={mockValuesFile}
            setFile={setMockValuesFile}
            onClear={() => {
              setMockValuesFile(null);
            }}
          />
          <p>{mockValuesFile ? mockValuesFile.name : '-'}</p>
        </div>
      </div>
      {/*) : (*/}
      {/*  <></>*/}
      {/*)}*/}

      <button className={'submitButton'} onClick={onClickTranslateNodes}>
        Translate nodes
      </button>
    </>
  );
};

try {
  const container = document.getElementById('root');
  if (container) ReactDOM.createRoot(container).render(<App />);
  else console.error('Root element not found');
} catch (e) {
  console.error('React mount error:', e);
}
