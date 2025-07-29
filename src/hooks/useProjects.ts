import { useState } from "react";
import { projects, uiImages } from "../data/projects";
import { TabType } from "../types/project";

export const useProjects = () => {
  const [selectedTab, setSelectedTabState] = useState<{
    [key: string]: TabType;
  }>({});
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{
    [key: string]: number;
  }>({});

  const setSelectedTab = (projectId: string, tab: TabType) => {
    setSelectedTabState((prev) => ({
      ...prev,
      [projectId]: tab,
    }));
  };

  const getSelectedTab = (projectId: string): TabType => {
    return selectedTab[projectId] || "소개";
  };

  const nextImage = (projectId: string) => {
    const projectImages = uiImages[projectId as keyof typeof uiImages] || [];
    if (projectImages.length > 0) {
      setCurrentImageIndexes((prev) => ({
        ...prev,
        [projectId]: ((prev[projectId] || 0) + 1) % projectImages.length,
      }));
    }
  };

  const prevImage = (projectId: string) => {
    const projectImages = uiImages[projectId as keyof typeof uiImages] || [];
    if (projectImages.length > 0) {
      setCurrentImageIndexes((prev) => ({
        ...prev,
        [projectId]:
          ((prev[projectId] || 0) - 1 + projectImages.length) %
          projectImages.length,
      }));
    }
  };

  const setImageIndex = (projectId: string, index: number) => {
    setCurrentImageIndexes((prev) => ({
      ...prev,
      [projectId]: index,
    }));
  };

  return {
    projects,
    uiImages,
    selectedTab: getSelectedTab,
    setSelectedTab,
    currentImageIndexes,
    nextImage,
    prevImage,
    setImageIndex,
  };
};
