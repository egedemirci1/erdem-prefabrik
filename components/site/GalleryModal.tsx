"use client";

import { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryModalProps {
  title: string;
  specs: string;
  images: string[];
  mainImage: string;
  selectedIdx: number;
  onIndexChange: (idx: number) => void;
  onClose: () => void;
}

export default function GalleryModal({
  title,
  specs,
  images,
  mainImage,
  selectedIdx,
  onIndexChange,
  onClose,
}: GalleryModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const currentImage = images[selectedIdx] || mainImage;
  const canPrev = selectedIdx > 0;
  const canNext = selectedIdx < images.length - 1;

  const goPrev = useCallback(() => {
    if (canPrev) onIndexChange(selectedIdx - 1);
  }, [canPrev, selectedIdx, onIndexChange]);

  const goNext = useCallback(() => {
    if (canNext) onIndexChange(selectedIdx + 1);
  }, [canNext, selectedIdx, onIndexChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    const previouslyFocused = document.activeElement as HTMLElement | null;
    modalRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [onClose, goPrev, goNext]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} galeri`}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-5xl bg-white rounded-2xl overflow-hidden outline-none"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Galeriyi kapat"
          className="absolute top-3 right-3 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Main image */}
        <div className="relative w-full h-[60vh]">
          <Image
            src={currentImage}
            alt={`${title} — görsel ${selectedIdx + 1}/${images.length}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            quality={90}
            className="object-contain bg-black"
          />

          {/* Prev / Next overlays */}
          {canPrev && (
            <button
              onClick={goPrev}
              aria-label="Önceki görsel"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {canNext && (
            <button
              onClick={goNext}
              aria-label="Sonraki görsel"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Info bar */}
        <div className="p-4 flex items-center justify-between">
          <div>
            <div className="text-lg font-medium">{title}</div>
            <div className="text-sm text-muted-foreground">{specs}</div>
          </div>
          <div className="text-sm text-muted-foreground">
            {selectedIdx + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="px-4 pb-4 grid grid-cols-6 sm:grid-cols-8 gap-2 max-h-40 overflow-auto">
            {images.map((img, idx) => (
              <button
                key={`${img}-${idx}`}
                onClick={() => onIndexChange(idx)}
                aria-label={`Görsel ${idx + 1}`}
                className={`relative h-16 cursor-pointer rounded overflow-hidden ${
                  idx === selectedIdx ? "ring-2 ring-accent" : "opacity-70 hover:opacity-100"
                } transition-all`}
              >
                <Image
                  src={img}
                  alt={`${title} küçük görsel ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 15vw, 10vw"
                  quality={60}
                  loading="lazy"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
