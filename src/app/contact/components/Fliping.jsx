"use client";
import { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.min";

export default function FlippingPDF() {
  const [pages, setPages] = useState([]);
  const [currentSpread, setCurrentSpread] = useState(0);

  useEffect(() => {
    const loadPdf = async () => {
      const pdfUrl = "/sample-10-page-pdf-a4-size.pdf";
      console.log("pdfUrl", pdfUrl)

      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;

      const pageImages = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);

        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;

        const imgData = canvas.toDataURL("image/png");
        pageImages.push(imgData);
      }

      setPages(pageImages);
    };

    loadPdf();
  }, []);

  // Total spreads = total pages
  const maxSpread = pages.length;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4">
      {pages.length > 0 ? (
        <>
          <HTMLFlipBook
            width={400}
            height={600}
            className="shadow-2xl rounded-md"
            onFlip={(e) => {
              setCurrentSpread(e.data);
            }}
          >
            {pages.map((imgSrc, index) => (
              <div key={index} className="flex justify-center items-center bg-white">
                <img src={imgSrc} alt={`Page ${index + 1}`} className="w-full h-full object-contain" />
              </div>
            ))}
          </HTMLFlipBook>

          {/* Progress Bar */}
          <div className="mt-8 w-full max-w-md">
            <div className="w-full bg-amber-200 rounded-full h-3 shadow-inner">
              <div
                className="bg-gradient-to-r from-amber-400 to-amber-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${((currentSpread + 1) / maxSpread) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-slate-600 mt-2">
              <span>📖 Beginning</span>
              <span className="font-medium">
                {Math.round(((currentSpread + 1) / maxSpread) * 100)}% Read
              </span>
              <span>📚 End</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full text-sm text-amber-700 border border-amber-200">
              <span>⌨️</span>
              <span>Use ← → arrow keys to flip pages</span>
            </div>
            <div className="text-xs text-slate-500">
              💡 Only the right page flips over the left page — just like a real book!
            </div>
          </div>
        </>
      ) : (
        <p>Loading PDF pages...</p>
      )}
    </div>
  );
}
