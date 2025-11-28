document.addEventListener("DOMContentLoaded", () => {
    if (!window.pdfjsLib) return;

    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    const AUTO_INTERVAL_MS = 250;
    const HOLD_DELAY_MS = 250;

    const initPdfViewer = (wrapper) => {
        const canvas = wrapper.querySelector(".pdf-canvas");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const pdfSrc = wrapper.dataset.pdfSrc;
        const indicatorEl = wrapper.parentElement.querySelector("[data-pdf-indicator]");
        const prevBtn = wrapper.parentElement.querySelector("[data-pdf-prev]");
        const nextBtn = wrapper.parentElement.querySelector("[data-pdf-next]");

        let pdfDoc = null;
        let pageNum = 1;
        let isRendering = false;
        let autoAdvanceTimer = null;
        let autoAdvanceStartTimer = null;
        let suppressClick = false;
        let didAutoAdvance = false;

        const updateIndicator = () => {
            if (!indicatorEl || !pdfDoc) return;
            indicatorEl.textContent = `Page ${pageNum} / ${pdfDoc.numPages}`;
        };

        const advancePage = () => {
            if (!pdfDoc || isRendering) return;
            pageNum = pageNum >= pdfDoc.numPages ? 1 : pageNum + 1;
            renderPage(pageNum);
        };

        const previousPage = () => {
            if (!pdfDoc || isRendering) return;
            pageNum = pageNum <= 1 ? pdfDoc.numPages : pageNum - 1;
            renderPage(pageNum);
        };

        const renderPage = (num) => {
            if (!pdfDoc || isRendering) return;
            isRendering = true;
            pdfDoc.getPage(num).then((page) => {
                const baseViewport = page.getViewport({ scale: 1 });
                const customScale = parseFloat(wrapper.dataset.renderScale);
                const minScaleAttr = parseFloat(wrapper.dataset.minScale);
                const minScale = Number.isNaN(minScaleAttr) ? 0.5 : minScaleAttr;

                let scale;
                if (!Number.isNaN(customScale) && customScale > 0) {
                    scale = customScale;
                } else {
                    const targetWidth = wrapper.clientWidth || canvas.parentElement.clientWidth || baseViewport.width;
                    scale = Math.max(minScale, targetWidth / baseViewport.width);
                }
                const viewport = page.getViewport({ scale });

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: ctx,
                    viewport
                };

                return page.render(renderContext).promise;
            }).catch(() => {
                // fail silently to avoid breaking other parts of the page
            }).finally(() => {
                isRendering = false;
                updateIndicator();
            });
        };

        pdfjsLib.getDocument(pdfSrc).promise.then((doc) => {
            pdfDoc = doc;
            renderPage(pageNum);
        });

        wrapper.addEventListener("click", (event) => {
            event.preventDefault();
            if (suppressClick) {
                suppressClick = false;
                return;
            }
            if (!pdfDoc || isRendering) return;
            advancePage();
        });

        const stopAutoAdvance = () => {
            if (autoAdvanceStartTimer) {
                clearTimeout(autoAdvanceStartTimer);
                autoAdvanceStartTimer = null;
            }
            if (autoAdvanceTimer) {
                clearInterval(autoAdvanceTimer);
                autoAdvanceTimer = null;
            }
            if (!didAutoAdvance) {
                suppressClick = false;
            }
        };

        const startAutoAdvance = () => {
            if (!pdfDoc) return;
            stopAutoAdvance();
            didAutoAdvance = false;
            autoAdvanceStartTimer = setTimeout(() => {
                didAutoAdvance = true;
                suppressClick = true;
                advancePage();
                autoAdvanceTimer = setInterval(advancePage, AUTO_INTERVAL_MS);
            }, HOLD_DELAY_MS);
        };

        ["mousedown", "touchstart"].forEach((evt) => {
            wrapper.addEventListener(evt, (event) => {
                event.preventDefault();
                startAutoAdvance();
            }, { passive: false });
        });

        ["mouseup", "touchend", "touchcancel", "mouseleave"].forEach((evt) => {
            wrapper.addEventListener(evt, (event) => {
                event.preventDefault();
                stopAutoAdvance();
            }, { passive: false });
        });

        if (nextBtn) {
            nextBtn.addEventListener("click", (event) => {
                event.preventDefault();
                stopAutoAdvance();
                advancePage();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", (event) => {
                event.preventDefault();
                stopAutoAdvance();
                previousPage();
            });
        }
    };

    document.querySelectorAll("[data-pdf-src]").forEach(initPdfViewer);
});
