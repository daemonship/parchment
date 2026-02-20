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
    onclone: (clonedDocument, element) => {
      // Ensure any lazy-loaded background images are visible
      const images = clonedDocument.querySelectorAll('img');
      images.forEach(img => {
        if (img.complete && img.naturalHeight === 0) {
          // broken image, maybe replace with placeholder
          console.warn('Image failed to load:', img.src);
        }
      });
    },
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

  // Try toBlob first, fallback to toDataURL
  let blob: Blob | null = null;
  try {
    blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((b) => {
        if (b) resolve(b);
        else reject(new Error('Canvas toBlob failed'));
      }, 'image/png');
    });
  } catch (err) {
    console.warn('toBlob failed, falling back to data URL', err);
    const dataUrl = canvas.toDataURL('image/png');
    const response = await fetch(dataUrl);
    blob = await response.blob();
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  
  // Revoke after a short delay to ensure download starts
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 5000);
}
