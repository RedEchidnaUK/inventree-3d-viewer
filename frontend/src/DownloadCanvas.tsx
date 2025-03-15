import { ActionIcon } from '@mantine/core';
import { IconPhotoDown} from '@tabler/icons-react';

export function DownloadCanvas({ canvasRef }: { canvasRef: any }) {

    const handleDownload = () => {
        const canvas = canvasRef.current.querySelector('canvas');
        canvas.toBlob((blob: Blob) => {
            if (blob) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'canvas-image.png';
                link.click();
            }
        });
    };

    return (
        <ActionIcon
            variant="filled"
            size="input-sm"
            aria-label="Download screenshot"
            onClick={handleDownload}
        >
            <IconPhotoDown/>
        </ActionIcon>
    );
};