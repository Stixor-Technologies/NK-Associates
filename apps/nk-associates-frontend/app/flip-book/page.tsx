"use client";
import React, { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { pdfjs, Document, Page as ReactPdfPage } from "react-pdf";

// import NKBooklet from "../../public/nk-booklet.pdf";
// import NKBooklet from "raw-loader!../../public/sample.pdf";
import NKBooklet from "../../public/sample.pdf";
import "./book-style.css";

// const width = 600;
// const height = 724;

const width = 600;
const height = 657;

const Pages = React.forwardRef<HTMLDivElement, { pageNumber: number }>(
  ({ pageNumber }, ref) => {
    return (
      <div ref={ref} className={`page !top-0`}>
        <ReactPdfPage
          renderTextLayer={false}
          renderAnnotationLayer={false}
          pageNumber={pageNumber}
          // scale={1.1}
          width={600}
          height={300}
        />
      </div>
    );
  },
);

Pages.displayName = "Pages";

const FlipBook = () => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [windowSize, setWindowSize] = useState<number>(0);
  const [itemPerPage, setitemPerPage] = useState<string>("");

  useEffect(() => {
    const handleWindowResize = () => {
      console.log("width", window.innerWidth);
      setWindowSize(window.innerWidth);
    };
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    setitemPerPage(`book-${windowSize}`);
  }, []);

  let flipBook = useRef(null);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.js",
      import.meta.url,
    ).toString();
  }, []);

  useEffect(() => {
    if (flipBook?.current) {
      // setTotalPage(flipBookRef.current.getPageFlip().getPageCount());
    }
  }, [flipBook]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    console.log("pages", numPages);
    setNumPages(numPages);
  }

  const nextButtonClick = () => {
    console.log(flipBook.current);
    if (flipBook?.current) {
      console.log("next clicked");
      flipBook?.current?.getPageFlip().flipNext();
    }
  };

  const prevButtonClick = () => {
    if (flipBook.current) {
      // flipBook?.current?.getPageFlip().flipPrev();
    }
  };

  console.log("flipbook", flipBook.current);

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <Document
        file={
          // "https://strapi-dev.nkgroupofcompanies.com/uploads/sample_d5aa72a3d9.pdf"
          // "https://strapi-dev.nkgroupofcompanies.com//uploads/dummy_f2108328f8.pdf"
          "https://strapi-dev.nkgroupofcompanies.com/uploads/nk_booklet1_1_177b422618.pdf"
        }
        onLoadError={(error) => {
          console.error(error);
        }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <HTMLFlipBook
          key={itemPerPage}
          width={width}
          height={height}
          size="fixed"
          minWidth={600}
          maxWidth={1200}
          minHeight={600}
          maxHeight={800}
          maxShadowOpacity={1}
          showCover={true}
          mobileScrollSupport={true}
          startPage={0}
          drawShadow={true}
          startZIndex={0}
          flippingTime={1000}
          usePortrait={false}
          autoSize={false}
          useMouseEvents={true}
          clickEventForward={true}
          swipeDistance={300}
          showPageCorners={true}
          disableFlipByClick={false}
          style={{ background: "#ccc" }}
          className="demo-book"
          ref={flipBook}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Pages key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </HTMLFlipBook>
        {/* <div className="container">
        <div>
          <button type="button">Previous page</button>
          <span>20</span> of <span>30</span>
          <button type="button" onClick={nextButtonClick}>
            Next page
          </button>
        </div>
      </div> */}
      </Document>
    </div>
  );
};

export default FlipBook;
