import html2canvas from 'html2canvas';

export interface CaptureOptions {
  scale?: number;
}

/**
 * Capture a DOM element as a canvas.
 * Awaits document.fonts.ready to ensure all fonts are loaded before capture.
 */
export async function captureHandout(
  element: HTMLElement,
  options: CaptureOptions = {}
): Promise<HTMLCanvasElement> {
  await document.fonts.ready;

  return html2canvas(element, {
    useCORS: true,
    allowTaint: false,
    backgroundColor: null,
    scale: options.scale ?? 2,
    logging: false,
  });
}

/**
 * Capture a DOM element and trigger a PNG download.
 */
export async function downloadHandout(
  element: HTMLElement,
  filename: string,
  options: CaptureOptions = {}
): Promise<void> {
  const canvas = await captureHandout(element, options);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => {
      if (b) resolve(b);
      else reject(new Error('Canvas toBlob failed'));
    }, 'image/png');
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}
