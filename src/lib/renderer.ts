import html2canvas from 'html2canvas';

export interface CaptureOptions {
  scale?: number;
}

/**
 * Capture a DOM element as a canvas.
 * Awaits document.fonts.ready (with a 10s timeout) to ensure fonts are loaded.
 */
export async function captureHandout(
  element: HTMLElement,
  options: CaptureOptions = {}
): Promise<HTMLCanvasElement> {
  // Wait for fonts, but don't hang forever if a font request stalls
  await Promise.race([
    document.fonts.ready,
    new Promise<void>((resolve) => setTimeout(resolve, 10000)),
  ]);

  let canvas: HTMLCanvasElement;
  try {
    canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: false,
      backgroundColor: null,
      scale: options.scale ?? 2,
      logging: false,
      onclone: (clonedDocument) => {
        const images = clonedDocument.querySelectorAll('img');
        images.forEach(img => {
          if (img.complete && img.naturalHeight === 0) {
            console.warn('Image failed to load during export:', img.src);
          }
        });
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`Rendering failed: ${msg}. Try a different browser if this persists.`);
  }

  return canvas;
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

  // Try toBlob first (preferred), fall back to toDataURL for older browsers
  let blob: Blob | null = null;
  try {
    blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((b) => {
        if (b) resolve(b);
        else reject(new Error('Canvas toBlob returned null'));
      }, 'image/png');
    });
  } catch {
    // toBlob not supported or failed — try toDataURL fallback
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const response = await fetch(dataUrl);
      if (!response.ok) throw new Error(`fetch returned ${response.status}`);
      blob = await response.blob();
    } catch (fallbackErr) {
      const msg = fallbackErr instanceof Error ? fallbackErr.message : String(fallbackErr);
      throw new Error(`PNG export failed: ${msg}. Try using a different browser.`);
    }
  }

  if (!blob) {
    throw new Error('Export failed: could not create PNG file.');
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();

  // Revoke after a short delay to ensure the download starts
  setTimeout(() => {
    try {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    } finally {
      URL.revokeObjectURL(url);
    }
  }, 5000);
}
