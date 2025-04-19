import { useState, ChangeEvent } from 'react';
import { Select } from '@mantine/core';

interface ModelUrl {
  id: number;
  attachment: string;
  filename: string;
}

export function ModelSelector({ modelUrls, onModelChange }: { modelUrls: ModelUrl[], onModelChange: (url: string) => void }) {

  const [selectedModel, setSelectedModel] = useState<string>(modelUrls[0].attachment);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value, 10);
    const selectedUrl = modelUrls.find((obj: { id: number }) => obj.id === selectedId)?.attachment || '';
    setSelectedModel(selectedUrl);
    onModelChange(selectedUrl);
  };

  return (
    <>
      <Select
        id="model-select"
        value={modelUrls.find((obj: { attachment: string }) => obj.attachment === selectedModel)?.id.toString() || ''}
        onChange={(value) => handleChange({ target: { value } } as ChangeEvent<HTMLSelectElement>)}
        data={modelUrls.map(modeUrl => ({ value: modeUrl.id.toString(), label: modeUrl.filename }))}
        allowDeselect={false}
      />
    </>
  );
};
