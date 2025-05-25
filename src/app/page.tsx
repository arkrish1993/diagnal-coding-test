/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  getFilteredItems,
  getNextIndex,
  getPageURL,
  getTotalPageCount,
  scrollToTop,
} from "./common/utils";
import { ContentItem, PageItem } from "./common/interfaces";
import ContentCard from "./components/contentCard";
import { FaArrowCircleUp } from "react-icons/fa";
import Header from "./components/header";

const HomePage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<ContentItem[]>([]);
  const [page, setPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const [visible, setVisible] = useState(false);
  const [isFinalPage, setIsFinalPage] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const contentSectionRef = useRef<HTMLDivElement | null>(null);

  /**
   * Loads a page of content from the server.
   * - Fetches data from the backend using the provided page number.
   * - Updates the title, content list, and final page status.
   * @param {number} pageNum - The page number to load.
   */
  const loadPage = async (pageNum: number) => {
    try {
      const res = await fetch(getPageURL(pageNum));
      const json = await res.json();
      const pageData: PageItem = json.page;
      if (pageData.title !== title) {
        setTitle(pageData.title);
      }
      const totalPageCount = getTotalPageCount(
        pageData["total-content-items"],
        pageData["page-size-requested"]
      );
      setIsFinalPage(totalPageCount === pageNum);
      setContent((prev) => [...prev, ...pageData["content-items"].content]);
    } catch (e) {
      console.error(`Failed to load page ${pageNum}:`, e);
    }
  };

  /**
   * Loads content when page number updates,
   * unless the final page has already been reached.
   */
  useEffect(() => {
    if (!isFinalPage) {
      loadPage(page);
    }
  }, [page, isFinalPage]);

  /**
   * Sets up an IntersectionObserver to load the next page
   * when the user scrolls near the bottom of the content.
   */
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });
    if (viewportRef.current) observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, []);

  /**
   * Updates the window width and height on resize.
   */
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredContent = getFilteredItems(content, searchKey);
  const isPortrait = windowWidth < windowHeight;
  const columnCount = isPortrait ? 3 : 5;

  /**
   * Handles arrow key navigation for grid items.
   * @param {KeyboardEvent} e - The keyboard event.
   */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const focusable =
        contentSectionRef.current?.querySelectorAll('[tabindex="0"]');
      if (!focusable || !document.activeElement) return;
      const currentIndex = Array.from(focusable).indexOf(
        document.activeElement as HTMLElement
      );

      if (currentIndex === -1) return;

      const nextIndex = getNextIndex(e.key, currentIndex, columnCount);

      if (nextIndex >= 0 && nextIndex < focusable.length) {
        (focusable[nextIndex] as HTMLElement).focus();
        e.preventDefault();
      }
    },
    [columnCount]
  );

  /**
   * Toggles the visibility of the "scroll to top" button based on scroll position.
   */
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  /**
   * Adds/removes event listeners.
   */
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, [toggleVisible]);

  return (
    <div className="p-4 mb-4">
      <Header
        title={title}
        searchKey={searchKey}
        visible={visible}
        setSearch={setSearchKey}
      />

      {filteredContent.length > 0 && (
        <div
          ref={contentSectionRef}
          className={`content-section grid gap-4 mt-4 mb-8 grid-cols-${columnCount}`}
        >
          {filteredContent.map((item, index) => (
            <ContentCard key={index} cardItem={item} />
          ))}
        </div>
      )}

      {filteredContent.length === 0 && (
        <div className="content-section mt-8 text-sm text-center italic">
          No results found.
        </div>
      )}

      <div ref={viewportRef} />

      {visible && (
        <button className="fixed bottom-4 right-4 scroll-to-top">
          <FaArrowCircleUp className="w-8 h-8" onClick={scrollToTop} />
        </button>
      )}
    </div>
  );
};

export default HomePage;
